# 🛒 Multi Vendor Ecommerce Platform

A full-stack multi-vendor ecommerce web application built using Django REST Framework and React JS.

This platform allows customers to browse products, place orders, track deliveries, write reviews, and manage their shopping experience, while vendors can manage products, orders, and delivery status through a dedicated vendor dashboard.

---

# 🚀 Features

## 👤 Customer Features

- User Authentication (JWT Login/Register)
- Browse Products
- Product Search & Filtering
- Add to Cart
- Wishlist System
- Place Orders
- Order Tracking
- Vendor-wise Delivery Status
- Product Reviews & Ratings
- Cancel Orders
- Delete Orders
- Responsive UI

---

## 🏪 Vendor Features

- Vendor Registration
- Vendor Dashboard
- Add / Edit / Delete Products
- Manage Orders
- Update Delivery Status
- View Customer Details
- Vendor-specific Order Management

---

# 🧰 Tech Stack

## Frontend
- React JS
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Lucide React Icons

## Backend
- Django
- Django REST Framework
- JWT Authentication
- PostgreSQL / Neon Database

---

# 📦 Project Structure

```bash
frontend/
backend/
users/
products/
orders/
reviews/
wishlist/
cart/
vendors/
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/multi-vendor-ecommerce.git
```

---

## 2️⃣ Backend Setup

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv env
```

### Activate Environment

#### Windows

```bash
env\Scripts\activate
```

#### Mac/Linux

```bash
source env/bin/activate
```

### Install Requirements

```bash
pip install -r requirements.txt
```

---

## 3️⃣ Configure Environment Variables

Create `.env`

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_neon_database_url

ALLOWED_HOSTS=127.0.0.1,localhost
```

---

## 4️⃣ Run Migrations

```bash
python manage.py migrate
```

---

## 5️⃣ Start Backend Server

```bash
python manage.py runserver
```

---

## 6️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 API Features

- JWT Authentication
- Product APIs
- Cart APIs
- Wishlist APIs
- Order APIs
- Review APIs
- Vendor APIs

---

# ⭐ Vendor-wise Delivery System

Each product inside an order has its own delivery status.

Example:

- Vendor A → Delivered
- Vendor B → Processing
- Vendor C → Shipped

Customers can review only delivered products.

---

# 🔐 Authentication

JWT Authentication using:

- Access Token
- Refresh Token

---

# 📸 Screenshots

Add screenshots here.

---

# 🚀 Deployment

Backend:
- Render / Railway / PythonAnywhere

Frontend:
- Vercel / Netlify

Database:
- Neon PostgreSQL

---

# 👨‍💻 Author

Akuram V

---

# 📄 License

This project is for educational and portfolio purposes.
