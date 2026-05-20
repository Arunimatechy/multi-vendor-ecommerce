

import { useState } from "react";

import API from "../services/axios";

import { useDispatch } from "react-redux";

import { setCredentials } from "../features/auth/authSlice";

import { loadUserCart } from "../features/cart/cartSlice";

import { setWishlist } from "../features/wishlist/wishlistSlice";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  LogIn,
  User,
  Lock,
  ShoppingBag,
} from "lucide-react";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("token/", formData);

      const access = res.data.access;
      const refresh = res.data.refresh;

      const user = res.data.user || {};
      const role = user.role || "";

      dispatch(
        setCredentials({
          access,
          refresh,
          user,
          role,
        })
      );

      dispatch(loadUserCart());

      try {
        const wishlistRes = await API.get("wishlist/");
        dispatch(setWishlist(wishlistRes.data));
      } catch (err) {
        console.log(err);
      }

      toast.success("Login Successful 🎉");

      if (role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      toast.error("Invalid username or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* SOFT BACKGROUND BLOBS */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-pink-300/30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-orange-300/30 blur-3xl rounded-full"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-2xl overflow-hidden">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center p-14 text-white bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 relative">

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent)]"></div>

          <div className="relative z-10">

            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl mb-8 shadow-lg">
              <ShoppingBag size={38} />
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight">
              NovaMart
            </h1>

            <p className="mt-5 text-white/90 text-lg leading-relaxed">
              Experience a modern multi-vendor shopping platform built for speed, trust, and simplicity.
            </p>

            <div className="mt-10 space-y-4 text-white/90">

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Secure Authentication System
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Smooth Checkout Experience
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Multi-Vendor Architecture
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 sm:p-14 flex flex-col justify-center">

          {/* MOBILE ICON */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
              <ShoppingBag size={36} className="text-white" />
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Welcome Back
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mt-3 mx-auto lg:mx-0"></div>

            <p className="text-gray-500 mt-4">
              Login to continue your shopping journey
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* USERNAME */}
            <div className="relative group">
              <User className="absolute left-4 top-4 text-pink-400" size={20} />

              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-pink-400 transition shadow-sm"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-pink-400" size={20} />

              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-pink-400 transition shadow-sm"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn size={20} />
                  Login
                </span>
              )}
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-center mt-8 text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-pink-500 font-semibold hover:text-orange-400 transition"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
