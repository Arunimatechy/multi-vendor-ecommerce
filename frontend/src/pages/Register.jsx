// import { useState } from "react";
// import API from "../services/axios";
// import { useNavigate, Link } from "react-router-dom";

// import { UserPlus, User, Mail, Lock, Shield } from "lucide-react";

// function Register() {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "customer",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("users/register/", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       });

//       alert("Registration Success");
//       navigate("/login");

//     } catch (err) {
//       console.log(err.response?.data || err.message);
//       alert("Registration Failed");

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     <div className="min-h-screen bg-linear-to-b from-[#0b0f19] via-[#111827] to-[#0b0f19] flex items-center justify-center px-4 py-10">

//       <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-white">

//         {/* HEADER */}
//         <div className="text-center mb-8">

//           <div className="flex justify-center mb-3">
//             <UserPlus size={34} className="text-amber-400" />
//           </div>

//           <h1 className="text-3xl font-bold">
//             Create Account
//           </h1>

//           <p className="text-slate-400 mt-2">
//             Join the marketplace experience
//           </p>

//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* USERNAME */}
//           <div className="relative">

//             <User className="absolute left-3 top-3 text-slate-400" size={18} />

//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               onChange={handleChange}
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//             />

//           </div>

//           {/* EMAIL */}
//           <div className="relative">

//             <Mail className="absolute left-3 top-3 text-slate-400" size={18} />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//             />

//           </div>

//           {/* PASSWORD */}
//           <div className="relative">

//             <Lock className="absolute left-3 top-3 text-slate-400" size={18} />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//             />

//           </div>

//           {/* ROLE - PREMIUM CARDS */}
//           <div>

//             <div className="flex items-center gap-2 mb-2 text-slate-400 text-sm">
//               <Shield size={16} />
//               Select Role
//             </div>

//             <div className="grid grid-cols-2 gap-3">

//               {/* CUSTOMER */}
//               <label className={`cursor-pointer p-4 rounded-xl border transition
//                 ${formData.role === "customer"
//                   ? "border-amber-400 bg-amber-400/10"
//                   : "border-white/10 bg-white/5"
//                 }`}>

//                 <input
//                   type="radio"
//                   name="role"
//                   value="customer"
//                   onChange={handleChange}
//                   className="hidden"
//                 />

//                 <p className="font-semibold">Customer</p>
//                 <p className="text-xs text-slate-400 mt-1">
//                   Buy products
//                 </p>

//               </label>

//               {/* VENDOR */}
//               <label className={`cursor-pointer p-4 rounded-xl border transition
//                 ${formData.role === "vendor"
//                   ? "border-amber-400 bg-amber-400/10"
//                   : "border-white/10 bg-white/5"
//                 }`}>

//                 <input
//                   type="radio"
//                   name="role"
//                   value="vendor"
//                   onChange={handleChange}
//                   className="hidden"
//                 />

//                 <p className="font-semibold">Vendor</p>
//                 <p className="text-xs text-slate-400 mt-1">
//                   Sell products
//                 </p>

//               </label>

//             </div>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-amber-400 hover:bg-amber-500 text-black py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50"
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </button>

//         </form>

//         {/* LOGIN LINK */}
//         <div className="text-center mt-6 text-sm text-slate-400">

//           Already have an account?{" "}

//           <Link
//             to="/login"
//             className="text-amber-400 hover:text-amber-300 font-medium"
//           >
//             Login
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Register;
import { useState } from "react";

import API from "../services/axios";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  UserPlus,
  User,
  Mail,
  Lock,
  Shield,
  ShoppingBag,
  Store,
} from "lucide-react";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
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

      await API.post("users/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success("Registration Successful 🎉");

      navigate("/login");

    } catch (err) {

      console.log(err.response?.data || err.message);

      toast.error("Registration Failed ❌");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-white to-[#fff7ed] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      {/* ================= MAIN CARD ================= */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[40px] overflow-hidden shadow-2xl">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 p-12 text-white relative overflow-hidden">

          {/* GLOW */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center mb-8 backdrop-blur-xl">

              <ShoppingBag size={40} />

            </div>

            <h1 className="text-5xl font-black leading-tight">

              Join NovaMart

            </h1>

            <p className="mt-6 text-lg text-white/90 leading-relaxed">

              Create your premium marketplace account and
              start shopping or selling products worldwide.

            </p>

            {/* FEATURES */}
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

                  Trusted Multi Vendor Platform

                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-white"></div>

                <p className="text-white/90">

                  Easy Shopping & Selling Experience

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">

          {/* MOBILE ICON */}
          <div className="lg:hidden flex justify-center mb-8">

            <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-xl">

              <UserPlus
                size={38}
                className="text-white"
              />

            </div>

          </div>

          {/* HEADER */}
          <div className="text-center lg:text-left mb-8">

            <h2 className="text-4xl font-black text-gray-800">

              Create Account ✨

            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">

              Register now and become part of NovaMart.

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
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
              />

            </div>

            {/* EMAIL */}
            <div className="relative">

              <Mail
                className="absolute left-4 top-4 text-pink-400"
                size={20}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
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
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
              />

            </div>

            {/* ROLE */}
            <div>

              <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm font-medium">

                <Shield size={16} />

                Choose Account Type

              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* CUSTOMER */}
                <label
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    formData.role === "customer"
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white border-transparent shadow-lg"
                      : "bg-pink-50 border-pink-100 text-gray-700"
                  }`}
                >

                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                    className="hidden"
                  />

                  <div className="flex items-center gap-3 mb-2">

                    <ShoppingBag size={22} />

                    <p className="font-bold">

                      Customer

                    </p>

                  </div>

                  <p className="text-sm opacity-80">

                    Buy premium products easily

                  </p>

                </label>

                {/* VENDOR */}
                <label
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    formData.role === "vendor"
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white border-transparent shadow-lg"
                      : "bg-pink-50 border-pink-100 text-gray-700"
                  }`}
                >

                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={formData.role === "vendor"}
                    onChange={handleChange}
                    className="hidden"
                  />

                  <div className="flex items-center gap-3 mb-2">

                    <Store size={22} />

                    <p className="font-bold">

                      Vendor

                    </p>

                  </div>

                  <p className="text-sm opacity-80">

                    Sell products worldwide

                  </p>

                </label>

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
            >

              {
                loading
                  ? "Creating Account..."
                  : (
                    <span className="flex items-center justify-center gap-2">

                      <UserPlus size={20} />

                      Register

                    </span>
                  )
              }

            </button>

          </form>

          {/* FOOTER */}
          <div className="text-center mt-8 text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-pink-500 hover:text-orange-400 transition"
            >

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;