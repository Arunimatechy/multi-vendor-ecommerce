from django.db.models.signals import post_save

from django.dispatch import receiver

from orders.models import Order
from orders.models import OrderItem

from payments.models import Payment

from .models import Notification


# =========================================
# 📦 ORDER NOTIFICATION
# =========================================

@receiver(post_save, sender=Order)

def order_notification(sender, instance, created, **kwargs):

    if created:

        Notification.objects.create(

            user=instance.customer,

            title="Order Placed",

            message=f"Your order #{instance.id} placed successfully."
        )


# =========================================
# 💳 PAYMENT NOTIFICATION
# =========================================

@receiver(post_save, sender=Payment)

def payment_notification(sender, instance, created, **kwargs):

    if created:

        Notification.objects.create(

            user=instance.order.customer,

            title="Payment Update",

            message=f"Payment created for Order #{instance.order.id}"
        )


# =========================================
# 🏪 VENDOR ORDER NOTIFICATION
# =========================================

@receiver(post_save, sender=OrderItem)

def vendor_order_notification(sender, instance, created, **kwargs):

    if created:

        Notification.objects.create(

            user=instance.vendor.vendor,

            title="New Vendor Order",

            message=f"You received a new order for {instance.product.name}"
        )