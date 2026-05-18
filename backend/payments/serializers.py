from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):

    order_id = serializers.IntegerField(
        source='order.id',
        read_only=True
    )

    class Meta:
        model = Payment

        fields = [

            'id',
            'order_id',
            'payment_method',
            'payment_status',
            'transaction_id',
            'amount',
            'created_at',
        ]

        read_only_fields = [
            'payment_status',
            'transaction_id',
            'created_at'
        ]