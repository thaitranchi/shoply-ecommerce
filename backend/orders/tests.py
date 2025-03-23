from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from products.models import Product
from .models import Order, OrderItem

User = get_user_model()


class OrderAPITests(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username='testuser', 
            email='testuser@example.com',  # Ensure unique email
            password='testpassword'
        )
        self.client.force_authenticate(user=self.user)

        # Create sample products
        self.product1 = Product.objects.create(
            name="Product 1", description="Description 1", price=100.00, stock=10
        )
        self.product2 = Product.objects.create(
            name="Product 2", description="Description 2", price=200.00, stock=5
        )

        # Define URLs
        self.order_list_url = reverse('order-list')
        self.order_create_url = reverse('order-create')

    # Test order creation with multiple items
    def test_create_order(self):
        data = {
            "items": [
                {"product": self.product1.id, "quantity": 2, "price": "100.00"},
                {"product": self.product2.id, "quantity": 1, "price": "200.00"}
            ]
        }
        response = self.client.post(self.order_create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['total_price'], "400.00")
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(OrderItem.objects.count(), 2)

    # Test retrieving the order list
    def test_list_orders(self):
        order = Order.objects.create(user=self.user, total_price=300.00, is_paid=False)
        OrderItem.objects.create(order=order, product=self.product1, quantity=3, price=100.00)

        response = self.client.get(self.order_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['total_price'], "300.00")

    # Test retrieving order details
    def test_get_order_detail(self):
        order = Order.objects.create(user=self.user, total_price=300.00, is_paid=False)
        OrderItem.objects.create(order=order, product=self.product1, quantity=3, price=100.00)

        order_detail_url = reverse('order-detail', kwargs={'pk': order.id})
        response = self.client.get(order_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_price'], "300.00")

    # Test unauthorized access
    def test_unauthorized_access(self):
        user2 = User.objects.create_user(
            username='otheruser', 
            email='otheruser@example.com',  # Ensure unique email
            password='password123'
        )

        order = Order.objects.create(user=self.user, total_price=300.00)
        order_detail_url = reverse('order-detail', kwargs={'pk': order.id})

        self.client.force_authenticate(user=user2)
        response = self.client.get(order_detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Test creating order with invalid data
    def test_create_order_invalid_data(self):
        response = self.client.post(self.order_create_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Test creating order with insufficient stock
    def test_create_order_insufficient_stock(self):
        data = {
            "items": [
                {"product": self.product2.id, "quantity": 10, "price": "200.00"}  # Stock is only 5
            ]
        }
        response = self.client.post(self.order_create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Insufficient stock', str(response.data))