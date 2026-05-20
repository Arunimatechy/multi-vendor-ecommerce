


import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

import {
  ShoppingCart,
  Heart,
  Home,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  User,
  ClipboardList,
  Store,
  Sparkles,
} from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { access, role, user } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.items);

  const userRole = role?.toLowerCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const baseBtn =
    "flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95";

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-pink-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* ================= BRAND ================= */}
        <Link to="/" className="flex items-center gap-3 group">

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-orange-400 blur-xl opacity-40 group-hover:opacity-70 transition rounded-2xl"></div>

            <div className="relative h-11 w-11 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow-lg">
              <Store size={22} className="text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
              Luxora
            </h1>

            <div className="flex items-center gap-1 text-[11px] text-gray-400 -mt-1">
              <Sparkles size={10} />
              Premium Marketplace
            </div>
          </div>

        </Link>

        {/* ================= MENU ================= */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* HOME */}
          {userRole !== "vendor" && (
            <Link
              to="/"
              className={`${baseBtn} text-gray-700 hover:bg-pink-50 hover:text-pink-500`}
            >
              <Home size={18} />
              Home
            </Link>
          )}

          {/* NOT LOGGED IN */}
          {!access && (
            <>
              <Link
                to="/login"
                className={`${baseBtn} bg-white border border-pink-100 text-gray-700 hover:bg-pink-50 hover:text-pink-500 shadow-sm`}
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className={`${baseBtn} bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-md hover:shadow-lg`}
              >
                <UserPlus size={18} />
                Register
              </Link>
            </>
          )}

          {/* CUSTOMER */}
          {access && userRole === "customer" && (
            <>
              <div
                className={`${baseBtn} bg-linear-to-r from-pink-50 to-orange-50 border border-pink-100 text-pink-600`}
              >
                <User size={18} />
                {user?.username || "User"}
              </div>

              <Link
                to="/cart"
                className={`${baseBtn} bg-white border border-pink-100 text-gray-700 hover:bg-pink-50 relative`}
              >
                <ShoppingCart size={18} />
                Cart
                <span className="ml-1 bg-linear-to-r from-pink-500 to-orange-400 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems?.length || 0}
                </span>
              </Link>

              <Link
                to="/wishlist"
                className={`${baseBtn} bg-white border border-pink-100 text-gray-700 hover:bg-pink-50`}
              >
                <Heart size={18} />
                Wishlist
                <span className="ml-1 bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">
                  {wishlist?.length || 0}
                </span>
              </Link>

              <Link
                to="/my-orders"
                className={`${baseBtn} bg-white border border-pink-100 text-gray-700 hover:bg-pink-50`}
              >
                <ClipboardList size={18} />
                Orders
              </Link>
            </>
          )}

          {/* VENDOR */}
          {access && userRole === "vendor" && (
            <Link
              to="/vendor-dashboard"
              className={`${baseBtn} bg-linear-to-r from-violet-500 to-indigo-600 text-white shadow-md hover:shadow-lg`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}

          {/* LOGOUT */}
          {access && (
            <button
              onClick={handleLogout}
              className={`${baseBtn} bg-linear-to-r from-red-500 to-rose-600 text-white shadow-md hover:shadow-lg`}
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;