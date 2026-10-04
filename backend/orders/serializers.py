from rest_framework import serializers
from django.db import transaction
from .models import Order, OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    price = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)  # ✅ Nested Serializer

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'total_price', 'is_paid', 'status', 'items']
        read_only_fields = ['id', 'created_at', 'total_price', 'is_paid', 'status']

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")
        return value

    @transaction.atomic  # ✅ Ensures atomicity
    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(user=self.context['request'].user, **validated_data)
        total = 0

        try:
            for item_data in items_data:
                product = Product.objects.select_for_update().get(id=item_data['product'].id)

                # ✅ Check stock
                if item_data['quantity'] > product.stock:
                    raise serializers.ValidationError(
                        f"Insufficient stock for {product.name}. Available: {product.stock}"
                    )

                order_item = OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item_data['quantity'],
                    price=product.price
                )

                total += float(order_item.price) * order_item.quantity
                product.stock -= item_data['quantity']
                product.save()

            order.total_price = total
            order.save()
            return order

        except Exception as e:
            raise e

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['items'] = OrderItemSerializer(instance.items.all(), many=True).data
        return response

class PaymentSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    token = serializers.CharField(max_length=100)  # Stripe payment token

    def validate(self, data):
        try:
            order = Order.objects.get(
                id=data['order_id'],
                is_paid=False,
                user=self.context['request'].user,
            )
        except Order.DoesNotExist:
            raise serializers.ValidationError("Order not found or already paid.")
        return data
        
    class Meta:
        model = Order
        fields = ['payment_id', 'payment_status', 'is_paid']

    def validate_payment_status(self, value):
        if value not in ['success', 'failure', 'pending']:
            raise serializers.ValidationError("Invalid payment status.")
        return value

class CancellationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status', 'is_refunded', 'refund_id']

    def validate_status(self, value):
        if value != 'cancelled':
            raise serializers.ValidationError("Status must be 'cancelled' to initiate a refund.")
        return value

    def update(self, instance, validated_data):
        with transaction.atomic():
            if instance.is_paid:
                validated_data['is_refunded'] = True
                validated_data['refund_id'] = f"REF-{instance.id}"

            if instance.status != 'cancelled':
                for item in instance.items.select_related('product'):
                    product = Product.objects.select_for_update().get(id=item.product_id)
                    product.stock += item.quantity
                    product.save()

            return super().update(instance, validated_data)