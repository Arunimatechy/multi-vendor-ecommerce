from django.urls import path

from .views import (
    create_razorpay_order,
    payment_success,
    cash_on_delivery,
    payment_history,
)

urlpatterns = [

    path(
        'create-order/<int:order_id>/',
        create_razorpay_order
    ),

    path(
        'success/',
        payment_success
    ),

    path(
        'cod/<int:order_id>/',
        cash_on_delivery
    ),

    path(
        'history/',
        payment_history
    ),
]