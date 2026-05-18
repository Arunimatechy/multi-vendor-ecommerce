from django.urls import path
from .views import (
    place_order,
    my_orders,
    order_detail,
    vendor_orders,
    delete_order,
    cancel_order,
    update_vendor_item_status
)

urlpatterns = [

    # ================= CUSTOMER =================
    path('place/', place_order),
    path('my-orders/', my_orders),
    path('<int:id>/', order_detail),
    path("delete/<int:id>/", delete_order),
    path('cancel/<int:id>/', cancel_order),

    # ================= VENDOR =================
    path('vendor-orders/', vendor_orders),

    # ✅ NEW SAFE VENDOR CONTROL (IMPORTANT)
    path('vendor-item-status/<int:id>/', update_vendor_item_status),
]