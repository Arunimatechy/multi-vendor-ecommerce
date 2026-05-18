// import { useEffect } from "react";

// import toast from "react-hot-toast";

// function OrderSuccess() {

//   useEffect(() => {

//     toast.success(
//       "🎉 Order placed successfully!"
//     );

//   }, []);

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] px-4 text-white">

//       <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">

//         {/* ICON */}
//         <div className="text-6xl mb-4">

//           🎉

//         </div>

//         {/* TITLE */}
//         <h1 className="text-3xl font-bold text-emerald-400">

//           Order Placed Successfully!

//         </h1>

//         {/* SUBTEXT */}
//         <p className="mt-4 text-slate-300 text-lg">

//           Thank you for your purchase. Your order is being processed.

//         </p>

//         {/* BUTTONS */}
//         <div className="mt-8 flex flex-col gap-3">

//           <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition">

//             Track Order

//           </button>

//           <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white py-3 rounded-xl font-semibold transition">

//             Continue Shopping

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default OrderSuccess;


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

    <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-orange-50 flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white border border-pink-100 shadow-2xl rounded-[40px] p-10 max-w-lg w-full overflow-hidden">

        {/* TOP GLOW */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-200/40 blur-3xl rounded-full"></div>

        {/* SUCCESS ICON */}
        <div className="relative flex justify-center">

          <div className="h-28 w-28 rounded-full bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-[0_10px_40px_rgba(236,72,153,0.4)]">

            <CheckCircle2
              size={60}
              className="text-white"
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="text-center mt-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm mb-5">

            <PackageCheck size={16} />

            Payment Successful

          </div>

          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">

            Order Confirmed 🎉

          </h1>

          <p className="mt-5 text-gray-500 text-lg leading-relaxed">

            Thank you for shopping with Luxora.
            Your order has been placed successfully
            and is now being processed.

          </p>

        </div>

        {/* ORDER STATUS */}
        <div className="mt-8 bg-linear-to-r from-pink-50 to-orange-50 border border-pink-100 rounded-3xl p-5">

          <div className="flex items-center justify-between">

            <div className="text-center flex-1">

              <div className="h-12 w-12 mx-auto rounded-2xl bg-pink-500 text-white flex items-center justify-center font-bold">

                1

              </div>

              <p className="text-sm font-semibold text-gray-700 mt-2">

                Ordered

              </p>

            </div>

            <div className="flex-1 h-1 bg-pink-300 rounded-full mx-2"></div>

            <div className="text-center flex-1">

              <div className="h-12 w-12 mx-auto rounded-2xl bg-orange-400 text-white flex items-center justify-center font-bold">

                2

              </div>

              <p className="text-sm font-semibold text-gray-700 mt-2">

                Processing

              </p>

            </div>

            <div className="flex-1 h-1 bg-gray-200 rounded-full mx-2"></div>

            <div className="text-center flex-1">

              <div className="h-12 w-12 mx-auto rounded-2xl bg-gray-200 text-gray-500 flex items-center justify-center font-bold">

                3

              </div>

              <p className="text-sm font-semibold text-gray-500 mt-2">

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
            className="w-full bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >

            <ShoppingBag size={20} />

            Track Order

            <ArrowRight size={18} />

          </button>

          {/* CONTINUE SHOPPING */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-white border border-pink-100 hover:bg-pink-50 text-gray-700 py-4 rounded-2xl font-semibold transition-all duration-300"
          >

            Continue Shopping

          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;