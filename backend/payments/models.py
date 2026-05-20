from django.db import models
from orders.models import Order


class Payment(models.Model):

    PAYMENT_METHODS = (
        ('razorpay', 'Razorpay'),
        ('cod', 'Cash On Delivery'),
    )

    PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE
    )

    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHODS
    )

    payment_status = models.CharField(
        max_length=50,
        choices=PAYMENT_STATUS,
        default='pending'
    )

    transaction_id = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )

    # ✅ ADD THIS
    razorpay_order_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    # ✅ ADD THIS
    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return str(self.order.id)