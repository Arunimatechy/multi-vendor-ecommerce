# from django.urls import path

# from .views import (
#     register_view,
#     profile_view,
# )

# urlpatterns = [

#     path(
#         'register/',
#         register_view
#     ),

#     path(
#         'profile/',
#         profile_view
#     ),
# ]

from django.urls import path

from .views import (
    register_view,
    profile_view,
    MyTokenObtainPairView,
)

urlpatterns = [

    # 👤 REGISTER
    path(
        'register/',
        register_view
    ),

    # 👤 PROFILE
    path(
        'profile/',
        profile_view
    ),

    # 🔐 LOGIN JWT
    path(
        'token/',
        MyTokenObtainPairView.as_view(),
    ),
]