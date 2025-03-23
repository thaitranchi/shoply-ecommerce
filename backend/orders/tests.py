from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from .models import Order, OrderItem
from products.models import Product

User = get_user_model()

class OrderAPITests(APITestCase):

    def setUp(self):
        self.client = APIClient()
        # Create a test user and log in
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        # Create a sample product
        self.product = Product.objects.create(
            name="Test Product",
            description="Test Description",
            price=100.00,
            stock=50
        )

    def test_create_order(self):
        url = reverse('order-create')
        data = {
            "items": [
                {
                    "product": self.product.id,
                    "quantity": 2,
                    "price": "100.00"
                }
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['total_price'], '200.00')  # Depending on formatting

    def test_list_orders(self):
        # First create an order
        order = Order.objects.create(user=self.user, total_price=100.00, is_paid=False)
        OrderItem.objects.create(order=order, product=self.product, quantity=1, price=100.00)
        url = reverse('order-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_order_detail(self):
        order = Order.objects.create(user=self.user, total_price=100.00, is_paid=False)
        OrderItem.objects.create(order=order, product=self.product, quantity=1, price=100.00)
        url = reverse('order-detail', kwargs={'pk': order.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], order.id)
