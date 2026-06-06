# 🛒 Multi Vendor Ecommerce Platform

A full-featured Multi Vendor Ecommerce Marketplace built with Django, Django REST Framework, PostgreSQL, and React.

The platform allows multiple vendors to manage their own stores, products, and orders while customers can browse, purchase products, and track orders seamlessly.

---

## 🚀 Live Demo

Frontend: https://your-frontend-url.vercel.app

Backend API: https://your-backend-url.onrender.com

---

## ✨ Features

### 👤 Customer

- User Registration & Login
- Browse Products
- Search & Filter Products
- Add to Cart
- Wishlist
- Checkout
- Order Tracking
- Profile Management

### 🏪 Vendor

- Vendor Registration
- Product Management
- Inventory Management
- Order Management
- Sales Dashboard

### 🛡️ Admin

- User Management
- Vendor Approval
- Product Moderation
- Order Monitoring
- Analytics Dashboard

---

## 🏗️ System Architecture

```text
Customer
   │
Frontend (React)
   │
REST API (Django REST Framework)
   │
PostgreSQL Database
```

---

## 🛠️ Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Frontend

- React
- Redux Toolkit
- Tailwind CSS
- Axios

### Deployment

- Render
- Vercel

---

## 📂 Project Structure

```bash
multi-vendor-ecommerce/
│
├── backend/
│   ├── users/
│   ├── products/
│   ├── vendors/
│   ├── orders/
│   ├── payments/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── redux/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Arunimatechy/multi-vendor-ecommerce.git
cd multi-vendor-ecommerce
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

### Install Requirements

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create `.env`

```env
SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
```

### Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Create Superuser

```bash
python manage.py createsuperuser
```

### Run Server

```bash
python manage.py runserver
```

---

## 🔐 Authentication

JWT Authentication

```http
POST /api/token/
```

Returns

```json
{
  "access": "token",
  "refresh": "token"
}
```

---

## 📦 Main API Endpoints

### Products

```http
GET /api/products/
POST /api/products/create/
GET /api/products/{id}/
PUT /api/products/{id}/
DELETE /api/products/{id}/
```

### Orders

```http
GET /api/orders/
POST /api/orders/create/
```

### Vendors

```http
GET /api/vendors/
POST /api/vendors/register/
```

---

## 📸 Screenshots

### Home Page

![Home](screenshots/home.png)

### Product Details

![Product](screenshots/product.png)

### Vendor Dashboard

![Vendor](screenshots/vendor-dashboard.png)

### Admin Dashboard

![Admin](screenshots/admin-dashboard.png)

---

## 🔥 Future Enhancements

- Stripe Payment Integration
- Razorpay Integration
- Product Reviews
- Real-time Notifications
- Vendor Analytics
- Recommendation System
- AI Product Search

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

## 👨‍💻 Author

Arunima

GitHub:
https://github.com/Arunimatechy

LinkedIn:
https://linkedin.com/in/your-profile

---

## ⭐ Support

If you found this project helpful, please give it a star ⭐
