import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom";

import Navbar from "./components/Navbar";
import CreateStore from "./pages/CreateStore";
import Home from "./pages/Home";

import OrderDetail from "./pages/OrderDetail";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorOrders from "./pages/VendorOrders";
import VendorDashboard from "./pages/VendorDashboard";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetail from "./pages/ProductDetail";
import VendorProducts from "./pages/VendorProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import EditProduct from "./pages/EditProduct";
import EditStore from "./pages/EditStore";

import Wishlist from "./pages/Wishlist";

import MyOrders from "./pages/MyOrders";
function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
  path="/my-orders"
  element={
    <ProtectedRoute role="customer">
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/vendor-orders"
  element={
    <ProtectedRoute>
      <VendorOrders />
    </ProtectedRoute>
  }
/>


<Route
  path="/wishlist"
  element={<Wishlist />}
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
  path="/checkout"
  element={<Checkout />}
/>



<Route
  path="/edit-store"
  element={
    <ProtectedRoute>
      <EditStore />
    </ProtectedRoute>
  }
/>

        <Route
  path="/cart"
  element={<Cart />}
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

  path="/edit-product/:id"

  element={

    <ProtectedRoute>

      <EditProduct />

    </ProtectedRoute>
  }
/>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
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

  path="/product/:id"

  element={<ProductDetail />}
/>

<Route
  path="/create-store"
  element={<CreateStore />}
/>

<Route
  path="/order-success"
  element={<OrderSuccess />}
/>
<Route
  path="/vendor-dashboard"
  element={
    <ProtectedRoute role="vendor">
      <VendorDashboard />
    </ProtectedRoute>
  }
/>
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;