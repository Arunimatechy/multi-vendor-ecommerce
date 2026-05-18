
from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

# 🔥 IMPORT CUSTOM JWT VIEW
from users.views import MyTokenObtainPairView


urlpatterns = [

    path('admin/', admin.site.urls),

    # 👤 Users
    path(
        'api/users/',
        include('users.urls')
    ),

    # 🏪 Vendors
    path(
        'api/vendors/',
        include('vendors.urls')
    ),

    # 📦 Products
    path(
        'api/products/',
        include('products.urls')
    ),

    # 🛒 Cart
    path(
        'api/cart/',
        include('cart.urls')
    ),

    # 📦 Orders
    path(
        'api/orders/',
        include('orders.urls')
    ),

    # 💳 Payments
    path(
        'api/payments/',
        include('payments.urls')
    ),

    # ⭐ Reviews
    path(
        'api/reviews/',
        include('reviews.urls')
    ),

    # 🎟️ Coupons
    path(
        'api/coupons/',
        include('coupons.urls')
    ),

    # ❤️ Wishlist
    path(
        'api/wishlist/',
        include('wishlist.urls')
    ),

    # 🔔 Notifications
    path(
        'api/notifications/',
        include('notifications.urls')
    ),

    # 🔐 CUSTOM JWT LOGIN
    path(
        'api/token/',
        MyTokenObtainPairView.as_view()
    ),

    # 🔄 REFRESH TOKEN
    path(
        'api/token/refresh/',
        TokenRefreshView.as_view()
    ),
]