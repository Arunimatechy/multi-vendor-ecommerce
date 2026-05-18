


import { Link } from "react-router-dom";

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

  const { access, role, user } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const userRole = role?.toLowerCase();

  const handleLogout = () => {

    dispatch(logout());

    window.location.href = "/";
  };

  // COMMON BUTTON STYLE
  const iconBtn =
    "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105";

  return (

    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-pink-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          {/* ICON */}
          <div className="relative">

            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-orange-400 blur-xl opacity-50 group-hover:opacity-80 transition duration-300 rounded-2xl"></div>

            <div className="relative h-12 w-12 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow-xl">

              <Store
                size={24}
                className="text-white"
              />

            </div>

          </div>

          {/* TEXT */}
          <div>

            <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">

              Luxora

            </h1>

            <div className="flex items-center gap-1 text-[11px] text-gray-400 -mt-1">

              <Sparkles size={11} />

              Premium Marketplace

            </div>

          </div>

        </Link>

        {/* ================= MENU ================= */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* HOME */}
          {userRole !== "vendor" && (

            <Link
              to="/"
              className={
                iconBtn +
                " text-gray-700 hover:bg-pink-50 hover:text-pink-500"
              }
            >

              <Home size={18} />

              Home

            </Link>
          )}

          {/* ================= NOT LOGGED IN ================= */}
          {!access && (

            <>

              {/* LOGIN */}
              <Link
                to="/login"
                className={
                  iconBtn +
                  " border border-pink-100 bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-500 shadow-sm"
                }
              >

                <LogIn size={18} />

                Login

              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                className={
                  iconBtn +
                  " bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-xl hover:shadow-2xl"
                }
              >

                <UserPlus size={18} />

                Register

              </Link>

            </>
          )}

          {/* ================= CUSTOMER ================= */}
          {access && userRole === "customer" && (

            <>

              {/* USER */}
              <div
                className={
                  iconBtn +
                  " bg-linear-to-r from-pink-50 to-orange-50 border border-pink-100 text-pink-600 shadow-sm"
                }
              >

                <User size={18} />

                {user?.username}

              </div>

              {/* CART */}
              <Link
                to="/cart"
                className={
                  iconBtn +
                  " bg-white border border-pink-100 text-gray-700 hover:bg-pink-50 hover:text-pink-500 shadow-sm relative"
                }
              >

                <ShoppingCart size={18} />

                Cart

                <span className="bg-linear-to-r from-pink-500 to-orange-400 text-white text-xs px-2 py-0.5 rounded-full">

                  {cartItems.length}

                </span>

              </Link>

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                className={
                  iconBtn +
                  " bg-white border border-pink-100 text-gray-700 hover:bg-pink-50 hover:text-pink-500 shadow-sm"
                }
              >

                <Heart size={18} />

                Wishlist

                <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">

                  {wishlist.length}

                </span>

              </Link>

              {/* ORDERS */}
              <Link
                to="/my-orders"
                className={
                  iconBtn +
                  " bg-white border border-pink-100 text-gray-700 hover:bg-pink-50 hover:text-pink-500 shadow-sm"
                }
              >

                <ClipboardList size={18} />

                Orders

              </Link>

            </>
          )}

          {/* ================= VENDOR ================= */}
          {access && userRole === "vendor" && (

            <Link
              to="/vendor-dashboard"
              className={
                iconBtn +
                " bg-linear-to-r from-violet-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl"
              }
            >

              <LayoutDashboard size={18} />

              Dashboard

            </Link>
          )}

          {/* ================= LOGOUT ================= */}
          {access && (

            <button
              onClick={handleLogout}
              className={
                iconBtn +
                " bg-linear-to-r from-red-500 to-rose-600 hover:opacity-90 text-white shadow-lg"
              }
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