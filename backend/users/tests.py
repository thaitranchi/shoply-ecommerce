from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

User = get_user_model()

class UserProfileTests(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword"
        )
        self.client = APIClient()

        # Obtain JWT token for authentication
        response = self.client.post('/api/users/login/', {
            "username": "testuser",
            "password": "testpassword"
        })
        
        # Debug the response
        print("Login Response:", response.data)

        # Access token retrieval
        self.access_token = response.data.get('access', None)
        if self.access_token is None:
            self.fail(f"Login failed: {response.data}")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')


    # ✅ Test viewing profile
    def test_get_user_profile(self):
        response = self.client.get('/api/users/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], "testuser")
        self.assertEqual(response.data['email'], "testuser@example.com")

    # ✅ Test updating profile
    def test_update_user_profile(self):
        response = self.client.put('/api/users/profile/', {
            "email": "updatedemail@example.com"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], "updatedemail@example.com")

    # ✅ Test unauthorized access
    def test_unauthorized_access(self):
        # Remove token to simulate unauthorized request
        self.client.credentials()
        response = self.client.get('/api/users/profile/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # ✅ Test password change success
    def test_change_password_success(self):
        response = self.client.put('/api/users/change-password/', {
            "old_password": "testpassword",
            "new_password": "newtestpassword"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Password changed successfully")

        # Verify new password works
        self.client.logout()
        login_response = self.client.post('/api/users/login/', {
            "username": "testuser",
            "password": "newtestpassword"
        })
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

    # ✅ Test password change with wrong old password
    def test_change_password_wrong_old_password(self):
        response = self.client.put('/api/users/change-password/', {
            "old_password": "wrongpassword",
            "new_password": "newpassword"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Old password is incorrect")