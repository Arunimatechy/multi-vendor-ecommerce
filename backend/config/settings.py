



# """
# Django settings for config project.
# """

# from pathlib import Path
# from dotenv import load_dotenv
# import os
# import cloudinary
# from datetime import timedelta

# import dj_database_url

# # ================= BASE =================
# BASE_DIR = Path(__file__).resolve().parent.parent

# # ================= LOAD ENV =================
# load_dotenv(BASE_DIR / ".env")

# # ================= SECURITY =================
# SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-fallback-key")


# DEBUG = os.getenv("DEBUG", "True") == "True"
# ALLOWED_HOSTS = [
#     "127.0.0.1",
#     "localhost",
# ]

# RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")
# RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
# # ================= CLOUDINARY =================
# cloudinary.config(
#     cloud_name=os.getenv("CLOUD_NAME"),
#     api_key=os.getenv("API_KEY"),
#     api_secret=os.getenv("API_SECRET"),
# )

# CLOUDINARY_STORAGE = {
#     "CLOUD_NAME": os.getenv("CLOUD_NAME"),
#     "API_KEY": os.getenv("API_KEY"),
#     "API_SECRET": os.getenv("API_SECRET"),
# }

# # ================= INSTALLED APPS =================
# INSTALLED_APPS = [

#     # Django apps
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',

#     # Third-party apps
#     'rest_framework',
#     'corsheaders',
#     'rest_framework_simplejwt',
#     'django_filters',

#     'cloudinary',
#     'cloudinary_storage',

#     # Local apps
#     'users',
#     'vendors',
#     'products',
#     'cart',
#     'orders',
#     'payments',
#     'reviews',
#     'coupons',
#     'notifications',
#     'wishlist', 
# ]

# # ================= MIDDLEWARE =================
# MIDDLEWARE = [

#     'corsheaders.middleware.CorsMiddleware',

#     'django.middleware.security.SecurityMiddleware',
#     "whitenoise.middleware.WhiteNoiseMiddleware",
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]

# # ================= ROOT URL =================
# ROOT_URLCONF = 'config.urls'

# # ================= TEMPLATES =================
# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# # ================= WSGI =================
# WSGI_APPLICATION = 'config.wsgi.application'

# # ================= DATABASE =================
# # ================= DATABASE =================
# DATABASES = {
#     'default': dj_database_url.parse(
#         os.getenv("DATABASE_URL")
#     )
# }

# # ================= PASSWORD VALIDATION =================
# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]

# # ================= INTERNATIONALIZATION =================
# LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'

# USE_I18N = True

# USE_TZ = True

# # ================= STATIC FILES =================
# STATIC_URL = 'static/'

# # ================= MEDIA =================
# MEDIA_URL = '/media/'

# DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# STORAGES = {
#     "default": {
#         "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
#     },
#     "staticfiles": {
#         "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
#     },
# }

# # ================= CORS =================
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
# ]

# # ================= DRF =================
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ),
#     'DEFAULT_PERMISSION_CLASSES': (
#         'rest_framework.permissions.AllowAny',
#     ),
#     'DEFAULT_FILTER_BACKENDS': (
#         'django_filters.rest_framework.DjangoFilterBackend',
#     ),
# }

# # ================= JWT =================
# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
#     "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
#     "AUTH_HEADER_TYPES": ("Bearer",),
# }

# # ================= DEFAULT AUTO FIELD =================
# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# # ================= CUSTOM USER MODEL =================
# AUTH_USER_MODEL = 'users.User'





"""
Django settings for config project.
"""

from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta

import os
import cloudinary
import dj_database_url


# ======================================================
# BASE DIRECTORY
# ======================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ======================================================
# LOAD ENV FILE
# ======================================================

load_dotenv(BASE_DIR / ".env")


# ======================================================
# SECURITY
# ======================================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-fallback-key"
)

DEBUG = os.getenv(
    "DEBUG",
    "False"
) == "True"

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
     "multi-vendor-ecommerce-44o8.onrender.com",
]


# ======================================================
# RAZORPAY
# ======================================================

RAZORPAY_KEY_ID = os.getenv(
    "RAZORPAY_KEY_ID",
    ""
)

RAZORPAY_KEY_SECRET = os.getenv(
    "RAZORPAY_KEY_SECRET",
    ""
)


# ======================================================
# CLOUDINARY
# ======================================================

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
)

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.getenv("CLOUD_NAME"),
    "API_KEY": os.getenv("API_KEY"),
    "API_SECRET": os.getenv("API_SECRET"),
}


# ======================================================
# INSTALLED APPS
# ======================================================

INSTALLED_APPS = [

    # Django Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third Party Apps
    "rest_framework",
    "corsheaders",
    "rest_framework_simplejwt",
    "django_filters",

    "cloudinary",
    "cloudinary_storage",

    # Local Apps
    "users",
    "vendors",
    "products",
    "cart",
    "orders",
    "payments",
    "reviews",
    "coupons",
    "notifications",
    "wishlist",
]


# ======================================================
# MIDDLEWARE
# ======================================================

MIDDLEWARE = [

    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",

    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ======================================================
# ROOT URL
# ======================================================

ROOT_URLCONF = "config.urls"


# ======================================================
# TEMPLATES
# ======================================================

TEMPLATES = [
    {
        "BACKEND":
        "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ======================================================
# WSGI
# ======================================================

WSGI_APPLICATION = "config.wsgi.application"


# ======================================================
# DATABASE
# ======================================================

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}


# ======================================================
# PASSWORD VALIDATION
# ======================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME":
        "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ======================================================
# INTERNATIONALIZATION
# ======================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# ======================================================
# STATIC FILES
# ======================================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = (
    "whitenoise.storage.CompressedManifestStaticFilesStorage"
)


# ======================================================
# MEDIA FILES
# ======================================================

MEDIA_URL = "/media/"

DEFAULT_FILE_STORAGE = (
    "cloudinary_storage.storage.MediaCloudinaryStorage"
)

STORAGES = {

    "default": {
        "BACKEND":
        "cloudinary_storage.storage.MediaCloudinaryStorage",
    },

    "staticfiles": {
        "BACKEND":
        "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


# ======================================================
# CORS
# ======================================================

CORS_ALLOWED_ORIGINS = [

    "http://localhost:5173",

    
]


# ======================================================
# CSRF
# ======================================================

CSRF_TRUSTED_ORIGINS = [
    "https://*.onrender.com",
]


# ======================================================
# DJANGO REST FRAMEWORK
# ======================================================

REST_FRAMEWORK = {

    "DEFAULT_AUTHENTICATION_CLASSES": (

        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),

    "DEFAULT_PERMISSION_CLASSES": (

        "rest_framework.permissions.AllowAny",
    ),

    "DEFAULT_FILTER_BACKENDS": (

        "django_filters.rest_framework.DjangoFilterBackend",
    ),
}


# ======================================================
# JWT
# ======================================================

SIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME":
    timedelta(minutes=60),

    "REFRESH_TOKEN_LIFETIME":
    timedelta(days=7),

    "AUTH_HEADER_TYPES":
    ("Bearer",),
}


# ======================================================
# SECURITY FOR RENDER
# ======================================================

SECURE_PROXY_SSL_HEADER = (
    ("HTTP_X_FORWARDED_PROTO", "https")
)


# ======================================================
# DEFAULT AUTO FIELD
# ======================================================

DEFAULT_AUTO_FIELD = (
    "django.db.models.BigAutoField"
)


# ======================================================
# CUSTOM USER MODEL
# ======================================================

AUTH_USER_MODEL = "users.User"
