


import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  CheckCircle2,
  ShoppingBag,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

function OrderSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    toast.success(
      "🎉 Order placed successfully!"
    );

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-10">

      {/* SOFT BACKGROUND GLOW (subtle, premium look) */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-200/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-200/20 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white border border-gray-100 shadow-xl rounded-3xl p-10 max-w-lg w-full">

        {/* ICON */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center shadow-lg">
            <CheckCircle2 size={54} className="text-white" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="text-center mt-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold text-sm mb-5 border border-green-100">

            <PackageCheck size={16} />

            Payment Successful

          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">

            Order Confirmed 🎉

          </h1>

          <p className="mt-4 text-gray-500 text-base leading-relaxed">

            Thank you for shopping with us.
            Your order has been placed successfully and is now being processed.

          </p>

        </div>

        {/* ORDER STATUS */}
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div className="text-center flex-1">

              <div className="h-10 w-10 mx-auto rounded-xl bg-green-500 text-white flex items-center justify-center font-bold">
                1
              </div>

              <p className="text-xs font-semibold text-gray-700 mt-2">
                Ordered
              </p>

            </div>

            <div className="flex-1 h-[2px] bg-green-200 mx-2 rounded-full"></div>

            <div className="text-center flex-1">

              <div className="h-10 w-10 mx-auto rounded-xl bg-orange-400 text-white flex items-center justify-center font-bold">
                2
              </div>

              <p className="text-xs font-semibold text-gray-700 mt-2">
                Processing
              </p>

            </div>

            <div className="flex-1 h-[2px] bg-gray-200 mx-2 rounded-full"></div>

            <div className="text-center flex-1">

              <div className="h-10 w-10 mx-auto rounded-xl bg-gray-200 text-gray-500 flex items-center justify-center font-bold">
                3
              </div>

              <p className="text-xs font-semibold text-gray-500 mt-2">
                Delivered
              </p>

            </div>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col gap-4">

          {/* TRACK ORDER */}
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-base shadow-md transition flex items-center justify-center gap-2"
          >

            <ShoppingBag size={18} />

            Track Order

            <ArrowRight size={16} />

          </button>

          {/* CONTINUE SHOPPING */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-4 rounded-2xl font-semibold transition"
          >

            Continue Shopping

          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;