from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserProfileSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError

User = get_user_model()

# Helper function to validate password strength
def validate_password_strength(password):
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long.")
    # You can add more password checks like requiring numbers, special characters, etc.

# Register View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        password = serializer.validated_data.get('password')
        validate_password_strength(password)  # Validate password strength
        serializer.save()

# Login View
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

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

# User Profile View
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user  # Get the currently logged-in user

# Change Password View
@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

    validate_password_strength(new_password)  # Validate new password strength
    user.password = make_password(new_password)
    user.save()
    return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

# Password Reset Flow
def generate_password_reset_token(user):
    token = default_token_generator.make_token(user)  # Generate password reset token
    return token

def send_password_reset_email(user, token):
    reset_link = f"{settings.FRONTEND_URL}/password-reset-confirm/?token={token}"
    subject = "Đặt lại mật khẩu của bạn"
    message = f"Nhấp vào liên kết sau để đặt lại mật khẩu của bạn: {reset_link}"
    send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Email không tồn tại trong hệ thống."}, status=status.HTTP_400_BAD_REQUEST)

        token = generate_password_reset_token(user)
        send_password_reset_email(user, token)

        return Response({"message": "Email đặt lại mật khẩu đã được gửi."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(APIView):
    def post(self, request, token):
        email = request.data.get('email')
        new_password = request.data.get('new_password')

        # Handle missing data first
        if not email or not new_password:
            return Response({"error": "This field may not be blank."}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({"error": "Password is too short or not secure."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if not default_token_generator.check_token(user, token):
                return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({"detail": "Password reset successful"}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

# Additional helper function for password strength validation
def validate_password_strength(password):
    if len(password) < 8:
        return Response({"error": "Password is too short or not secure."}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        # Ensure that both old and new passwords are provided
        if not old_password or not new_password:
            return Response({"error": "Both old and new passwords are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user with the old password
        user = authenticate(username=request.user.username, password=old_password)
        if user is None:
            return Response({"error": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)

        # Change the password if old password is correct
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully!"}, status=status.HTTP_200_OK)