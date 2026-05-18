


// import { useState } from "react";
// import API from "../services/axios";

// import { useDispatch } from "react-redux";

// import { setCredentials } from "../features/auth/authSlice";
// import { loadUserCart } from "../features/cart/cartSlice";
// import { setWishlist } from "../features/wishlist/wishlistSlice";

// import { useNavigate, Link } from "react-router-dom";

// import { LogIn, User, Lock } from "lucide-react";

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("token/", formData);

//       const access = res.data.access;
//       const refresh = res.data.refresh;
//       const user = res.data.user;
//       const role = user.role;

//       // ======================
//       // LOCAL STORAGE
//       // ======================
//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);
//       localStorage.setItem("role", role);
//       localStorage.setItem("user", JSON.stringify(user));

//       // ======================
//       // REDUX AUTH
//       // ======================
//       dispatch(
//         setCredentials({
//           access,
//           refresh,
//           user,
//           role,
//         })
//       );

//       // ======================
//       // LOAD CART
//       // ======================
//       dispatch(loadUserCart());

//       // ======================
//       // LOAD WISHLIST (🔥 FIX)
//       // ======================
//       try {
//         const wishlistRes = await API.get("wishlist/");
//         dispatch(setWishlist(wishlistRes.data));
//       } catch (err) {
//         console.log("Wishlist load failed:", err);
//       }

//       alert("Login Success");

//       // ======================
//       // NAVIGATE
//       // ======================
//       if (role === "vendor") {
//         navigate("/vendor-dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Login Failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-b from-[#0b0f19] via-[#111827] to-[#0b0f19] flex items-center justify-center px-4">

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-6 text-white"
//       >

//         {/* HEADER */}
//         <div className="text-center">

//           <div className="flex justify-center mb-3">
//             <LogIn size={34} className="text-amber-400" />
//           </div>

//           <h1 className="text-3xl font-bold">
//             Welcome Back
//           </h1>

//           <p className="text-slate-400 mt-2">
//             Login to continue your shopping experience
//           </p>

//         </div>

//         {/* USERNAME */}
//         <div className="relative">

//           <User className="absolute left-3 top-3 text-slate-400" size={18} />

//           <input
//             name="username"
//             onChange={handleChange}
//             placeholder="Username"
//             className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
//           />

//         </div>

//         {/* PASSWORD */}
//         <div className="relative">

//           <Lock className="absolute left-3 top-3 text-slate-400" size={18} />

//           <input
//             name="password"
//             type="password"
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
//           />

//         </div>

//         {/* BUTTON */}
//         <button
//           type="submit"
//           className="w-full bg-amber-400 hover:bg-amber-500 text-black py-3 rounded-xl font-semibold text-lg transition"
//         >
//           Login
//         </button>

//         {/* FOOTER */}
//         <div className="text-center text-sm text-slate-400">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-amber-400 hover:text-amber-300 font-medium"
//           >
//             Create Account
//           </Link>
//         </div>

//       </form>

//     </div>
//   );
// }

// export default Login;
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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post("token/", formData);

      const access = res.data.access

      const refresh = res.data.refresh;

      const user = res.data.user || {};
const role = user.role || "";

      // ================= LOCAL STORAGE =================
      localStorage.setItem("access", access);

      localStorage.setItem("refresh", refresh);

      localStorage.setItem("role", role);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // ================= REDUX =================
      dispatch(
        setCredentials({
          access,
          refresh,
          user,
          role,
        })
      );

      // ================= LOAD CART =================
      dispatch(loadUserCart());

      // ================= LOAD WISHLIST =================
      try {

        const wishlistRes = await API.get("wishlist/");

        dispatch(setWishlist(wishlistRes.data));

      } catch (err) {

        console.log(err);

      }

      toast.success("Login Successful 🎉");

      // ================= NAVIGATE =================
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

    <div className="min-h-screen bg-linear-to-br from-[#fdf2f8] via-white to-[#fff7ed] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      {/* ================= LOGIN CARD ================= */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[40px] overflow-hidden shadow-2xl">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-pink-500 via-rose-500 to-orange-400 p-12 text-white relative overflow-hidden">

          {/* GLOW */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center mb-8 backdrop-blur-xl">

              <ShoppingBag size={40} />

            </div>

            <h1 className="text-5xl font-black leading-tight">

              NovaMart

            </h1>

            <p className="mt-6 text-lg text-white/90 leading-relaxed">

              Login and continue your premium shopping
              experience with trusted vendors worldwide.

            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-white"></div>

                <p className="text-white/90">

                  Secure Authentication

                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-white"></div>

                <p className="text-white/90">

                  Fast Checkout Experience

                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-white"></div>

                <p className="text-white/90">

                  Trusted Multi Vendor Platform

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex justify-center mb-8">

            <div className="h-20 w-20 rounded-3xl bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-xl">

              <ShoppingBag
                size={38}
                className="text-white"
              />

            </div>

          </div>

          {/* TITLE */}
          <div className="text-center lg:text-left mb-8">

            <h2 className="text-4xl font-black text-gray-800">

              Welcome Back 👋

            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">

              Sign in to your account and continue shopping.

            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* USERNAME */}
            <div className="relative">

              <User
                className="absolute left-4 top-4 text-pink-400"
                size={20}
              />

              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
              />

            </div>

            {/* PASSWORD */}
            <div className="relative">

              <Lock
                className="absolute left-4 top-4 text-pink-400"
                size={20}
              />

              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
            >

              {
                loading
                  ? "Logging in..."
                  : (
                    <span className="flex items-center justify-center gap-2">

                      <LogIn size={20} />

                      Login

                    </span>
                  )
              }

            </button>

          </form>

          {/* FOOTER */}
          <div className="text-center mt-8 text-gray-500">

            Don’t have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-pink-500 hover:text-orange-400 transition"
            >

              Create Account

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;