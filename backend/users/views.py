from rest_framework import generics, permissions, status, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.urls import reverse
from .serializers import RegisterSerializer, UserProfileSerializer,\
     PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework.views import APIView
import re
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User

User = get_user_model()

# Login View

# Helper function for sending email verification
def send_verification_email(request, user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verification_url = reverse('verify_email', kwargs={'uidb64': uid, 'token': token})

    # Construct full URL
    current_site = get_current_site(request)
    verification_link = f"{settings.FRONTEND_URL}{verification_url}"

    # Send email
    send_mail(
        'Verify Your Email Address',
        f'Please click the following link to verify your email: {verification_link}',
        'noreply@example.com',  # Your email
        [user.email],
    )

# Helper function to validate password strength
def validate_password_strength(password):
    if len(password) < 8:
        raise exceptions.ValidationError("Password must be at least 8 characters long.")
    if not re.search(r"\d", password):  # Check for digits
        raise exceptions.ValidationError("Password must contain at least one digit.")
    if not re.search(r"[A-Z]", password):  # Check for uppercase letter
        raise exceptions.ValidationError("Password must contain at least one uppercase letter.")
    if not re.search(r"\W", password):  # Special characters
        raise exceptions.ValidationError("Password must contain at least one special character.")

# Register View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        password = serializer.validated_data.get('password')
        validate_password_strength(password)  # Validate password strength
        user = serializer.save()
        
        # Send verification email after registration
        send_verification_email(self.request, user)

# Login View
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None and user.is_verified and user.is_active:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "message": "Login successful!"
        }, status=status.HTTP_200_OK)
    elif user is not None and not user.is_verified:
        return Response({"error": "Email not verified."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

# Change Password View (routed view)
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({"error": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)
        validate_password_strength(new_password)
        user.password = make_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

# User Profile View
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user  # Get the currently logged-in user

# Password Reset Flow
def send_password_reset_email(request, user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    reset_url = reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
    reset_link = f"{settings.FRONTEND_URL}{reset_url}"
    subject = "Đặt lại mật khẩu của bạn"
    message = f"Nhấp vào liên kết sau để đặt lại mật khẩu của bạn: {reset_link}"
    send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
            send_password_reset_email(request, user)
        except User.DoesNotExist:
            pass

        return Response({"message": "If that email exists, a password reset link has been sent."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        new_password = request.data.get('new_password')

        if not new_password:
            return Response({"error": "This field may not be blank."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "Invalid reset link"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password_strength(new_password)
        except exceptions.ValidationError as e:
            return Response({"error": e.detail[0]}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password reset successful"}, status=status.HTTP_200_OK)

# Email Verification View
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user and default_token_generator.check_token(user, token):
            user.is_verified = True
            user.is_active = True  # Activate the user
            user.save()
            return Response({"message": "Email verified successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid verification link."}, status=status.HTTP_400_BAD_REQUEST)

# Logout View (Invalidates Token)
@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")  # Use .get() to avoid KeyError
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the refresh token
        return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
