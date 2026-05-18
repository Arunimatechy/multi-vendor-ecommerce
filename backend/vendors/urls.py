from django.urls import path

from .views import create_store, my_store, update_store, delete_all_orders

urlpatterns = [
    path('create-store/', create_store),
    path('my-store/', my_store),
    path('update-store/', update_store),  # ✅ ADD THIS
    path("orders/delete-all/", delete_all_orders),
]