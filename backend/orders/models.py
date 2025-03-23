from django.conf import settings
from django.db import models
from products.models import Product  # Ensure this is imported relatively

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)

    class Meta:
        app_label = 'orders'  # ✅ Explicitly set the app label if needed

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of order

    class Meta:
        app_label = 'orders'  # ✅ Explicitly set the app label if needed
        
    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
