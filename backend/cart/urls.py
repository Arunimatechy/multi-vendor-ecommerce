from django.urls import path

from .views import (

    add_to_cart,
    view_cart,
    update_cart_item,
    remove_cart_item,
    clear_cart,
)

urlpatterns = [

    path(
        'add/',
        add_to_cart
    ),

    path(
        '',
        view_cart
    ),

    path(
        'update/<int:id>/',
        update_cart_item
    ),

    path(
        'remove/<int:id>/',
        remove_cart_item
    ),

    path(
        'clear/',
        clear_cart
    ),
]