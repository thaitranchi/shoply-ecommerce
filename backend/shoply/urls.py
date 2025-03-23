from django.urls import path
from users.views import RegisterView, login
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login, name='login'),
    path('api/users/', include('users.urls')),
    path('admin/', admin.site.urls),
]