from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'total_price', 'is_paid', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        total = 0

        for item_data in items_data:
            product = Product.objects.get(id=item_data['product'].id)
            
            # ✅ **Check for stock availability**
            if item_data['quantity'] > product.stock:
                raise serializers.ValidationError(
                    f"Insufficient stock for {product.name}. Available: {product.stock}"
                )
            
            # Create OrderItem and update total
            order_item = OrderItem.objects.create(order=order, **item_data)
            total += order_item.price * order_item.quantity

            # ✅ **Reduce stock after order placement**
            product.stock -= order_item.quantity
            product.save()

        order.total_price = total
        order.save()
        return order
