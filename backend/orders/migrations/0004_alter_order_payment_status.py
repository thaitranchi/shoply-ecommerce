# Generated by Django 5.1.7 on 2025-03-23 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_order_is_refunded_order_payment_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment_status',
            field=models.CharField(default='unpaid', max_length=20),
        ),
    ]
