from django.urls import path
from .views import RegisterView, login, logout
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Custom Views
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),

    # JWT Token Views
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
