from django.urls import path

from .views import (
    apply_coupon,
    coupon_list
)

urlpatterns = [

    # GET COUPONS
    path(
        '',
        coupon_list
    ),

    # APPLY COUPON
    path(
        'apply/',
        apply_coupon
    ),
]