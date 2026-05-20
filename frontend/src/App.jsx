
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateStore from "./pages/CreateStore";
import EditStore from "./pages/EditStore";

import VendorDashboard from "./pages/VendorDashboard";
import VendorOrders from "./pages/VendorOrders";
import VendorProducts from "./pages/VendorProducts";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";

import Wishlist from "./pages/Wishlist";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="pt-24">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          {/* ================= CUSTOMER PROTECTED ================= */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute role="customer">
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          {/* ================= VENDOR PROTECTED ================= */}
          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor-orders"
            element={
              <ProtectedRoute role="vendor">
                <VendorOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor-products"
            element={
              <ProtectedRoute role="vendor">
                <VendorProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-product"
            element={
              <ProtectedRoute role="vendor">
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute role="vendor">
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-store"
            element={
              <ProtectedRoute role="vendor">
                <CreateStore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-store"
            element={
              <ProtectedRoute role="vendor">
                <EditStore />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 PAGE ================= */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20 text-xl font-bold">
                404 - Page Not Found
              </div>
            }
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;