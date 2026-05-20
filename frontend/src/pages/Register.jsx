

import { useState } from "react";
import API from "../services/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  Store,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStrength = (password) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return 3;
    return 2;
  };

  const strength = getStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("users/register/", formData);
      toast.success("Registration Successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-orange-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/70 backdrop-blur-2xl rounded-4xl shadow-2xl overflow-hidden border border-white/40"
      >

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center p-14 text-white bg-linear-to-br from-pink-500 via-rose-500 to-orange-400 relative">

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent)]"></div>

          <div className="relative z-10">
            <ShoppingBag size={42} />

            <h1 className="text-4xl font-extrabold mt-6">
              Join NovaMart
            </h1>

            <p className="mt-4 text-white/90 leading-relaxed">
              Start your journey as a buyer or vendor in a modern multi-vendor marketplace.
            </p>

            <div className="mt-10 space-y-3 text-white/90 text-sm">

              <p>✔ Secure Authentication System</p>
              <p>✔ Multi Vendor Marketplace</p>
              <p>✔ Fast Shopping Experience</p>

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 sm:p-14 space-y-6">

          {/* TITLE */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Create Account
            </h2>

            <div className="w-14 h-1 bg-linear-to-r from-pink-500 to-orange-400 rounded-full mt-2"></div>

            <p className="text-gray-500 mt-3">
              Join NovaMart and start shopping or selling
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* USERNAME */}
            <div className="relative">
              <User className="absolute left-4 top-4 text-pink-400" size={18} />
              <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full pl-12 p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-pink-400" size={18} />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full pl-12 p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-pink-400" size={18} />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-12 pr-12 p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* PASSWORD STRENGTH */}
            {formData.password && (
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Password Strength
                </div>

                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      strength === 1
                        ? "w-1/3 bg-red-400"
                        : strength === 2
                        ? "w-2/3 bg-yellow-400"
                        : "w-full bg-green-500"
                    }`}
                  />
                </div>
              </div>
            )}

            {/* ROLE */}
            <div className="grid grid-cols-2 gap-4">

              <label
                className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                  formData.role === "customer"
                    ? "bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-lg"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="flex items-center gap-2 font-semibold">
                  <ShoppingBag size={18} />
                  Customer
                </div>

                <p className="text-xs mt-1 opacity-80">
                  Buy products
                </p>
              </label>

              <label
                className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                  formData.role === "vendor"
                    ? "bg-linear-to-r from-pink-500 to-orange-400 text-white shadow-lg"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="flex items-center gap-2 font-semibold">
                  <Store size={18} />
                  Vendor
                </div>

                <p className="text-xs mt-1 opacity-80">
                  Sell products
                </p>
              </label>

            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-linear-to-r from-pink-500 to-orange-400 text-white p-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link className="text-pink-500 font-semibold" to="/login">
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

export default Register;