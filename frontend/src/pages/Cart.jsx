// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// import {
//   removeFromCart,
//   increaseQty,
//   decreaseQty
// } from "../features/cart/cartSlice";

// import toast from "react-hot-toast";

// function Cart() {

//   const dispatch = useDispatch();

//   const cartItems = useSelector(
//     (state) => state.cart.cartItems
//   );

//   const total = cartItems.reduce(
//     (acc, item) =>
//       acc + item.price * item.quantity,
//     0
//   );

//   return (

//     <div className="min-h-screen bg-[#0b0f19] py-14 px-4 text-white">

//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-10">

//           <h1 className="text-5xl font-extrabold tracking-tight">
//             Shopping Cart
//           </h1>

//           <p className="text-slate-400 mt-2">
//             Review your selected products before checkout
//           </p>

//         </div>

//         {/* EMPTY CART */}
//         {cartItems.length === 0 ? (

//           <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-14 text-center shadow-xl">

//             <div className="text-6xl mb-4">
//               🛒
//             </div>

//             <h2 className="text-2xl font-semibold text-slate-300">

//               Your cart is empty

//             </h2>

//             <p className="text-slate-500 mt-2">

//               Add items to continue shopping

//             </p>

//             <Link
//               to="/"
//               className="inline-block mt-6 bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-xl font-semibold"
//             >

//               Start Shopping

//             </Link>

//           </div>

//         ) : (

//           <div className="space-y-6">

//             {/* CART ITEMS */}
//             {cartItems.map((item) => (

//               <div
//                 key={item.id}
//                 className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-amber-400/30 transition"
//               >

//                 {/* PRODUCT INFO */}
//                 <div className="flex items-center gap-5">

//                   <img
//                     src={
//                       item.image ||
//                       "https://via.placeholder.com/120"
//                     }
//                     alt={item.name}
//                     className="w-28 h-28 object-cover rounded-2xl border border-white/10"
//                   />

//                   <div>

//                     <h3 className="text-xl font-semibold">
//                       {item.name}
//                     </h3>

//                     <p className="text-slate-400 text-sm mt-1">
//                       Unit Price
//                     </p>

//                     <p className="text-xl font-bold text-amber-400">
//                       ₹ {item.price}
//                     </p>

//                   </div>

//                 </div>

//                 {/* QUANTITY CONTROLS */}
//                 <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">

//                   <button
//                     onClick={() => {

//                       dispatch(
//                         decreaseQty(item.id)
//                       );

//                       toast.success(
//                         "Quantity decreased"
//                       );
//                     }}
//                     className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-xl font-bold"
//                   >

//                     -

//                   </button>

//                   <span className="text-lg font-semibold w-8 text-center">

//                     {item.quantity}

//                   </span>

//                   <button
//                     onClick={() => {

//                       dispatch(
//                         increaseQty(item.id)
//                       );

//                       toast.success(
//                         "Quantity increased"
//                       );
//                     }}
//                     className="w-10 h-10 rounded-xl bg-amber-400 text-black hover:bg-amber-500 text-xl font-bold"
//                   >

//                     +

//                   </button>

//                 </div>

//                 {/* TOTAL */}
//                 <div className="text-center md:text-right">

//                   <p className="text-slate-400 text-sm">
//                     Item Total
//                   </p>

//                   <p className="text-2xl font-bold text-amber-400">

//                     ₹ {item.price * item.quantity}

//                   </p>

//                 </div>

//                 {/* REMOVE */}
//                 <button
//                   onClick={() => {

//                     dispatch(
//                       removeFromCart(item.id)
//                     );

//                     toast.error(
//                       "Item removed from cart"
//                     );
//                   }}
//                   className="bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-200 px-5 py-2 rounded-xl transition"
//                 >

//                   Remove

//                 </button>

//               </div>
//             ))}

//             {/* SUMMARY */}
//             <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between mt-10 shadow-xl">

//               <div>

//                 <h2 className="text-2xl font-bold">
//                   Order Summary
//                 </h2>

//                 <p className="text-slate-400 text-sm mt-1">
//                   Secure checkout ready
//                 </p>

//               </div>

//               <div className="flex flex-col items-center gap-4">

//                 <h2 className="text-3xl font-extrabold text-amber-400">

//                   ₹ {total.toFixed(2)}

//                 </h2>

//                 <Link
//                   to={
//                     cartItems.length === 0
//                       ? "#"
//                       : "/checkout"
//                   }
//                   className={`px-8 py-3 rounded-xl font-semibold transition ${
//                     cartItems.length === 0
//                       ? "bg-white/20 cursor-not-allowed text-white/50"
//                       : "bg-amber-400 hover:bg-amber-500 text-black"
//                   }`}
//                 >

//                   Proceed to Checkout

//                 </Link>

//               </div>

//             </div>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Cart;


import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQty,
  decreaseQty
} from "../features/cart/cartSlice";

import toast from "react-hot-toast";

import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Cart() {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#fff1f2] via-white to-[#fff7ed] py-12 px-4 overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ================= HEADER ================= */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg mb-5">

              <ShoppingBag size={16} />

              Your Shopping Cart

            </div>

            <h1 className="text-5xl font-black text-gray-800 tracking-tight">

              Cart Overview

            </h1>

            <p className="text-gray-500 mt-3 text-lg">

              Review your selected luxury products before checkout.

            </p>

          </div>

          {/* SUMMARY TOP */}
          {cartItems.length > 0 && (

            <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-3xl px-8 py-6 shadow-xl">

              <p className="text-gray-500 text-sm">
                Total Amount
              </p>

              <h2 className="text-4xl font-black bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent mt-2">

                ₹ {total.toFixed(2)}

              </h2>

            </div>
          )}

        </div>

        {/* ================= EMPTY CART ================= */}
        {cartItems.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[36px] p-16 text-center shadow-2xl">

            <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-2xl mb-8">

              <ShoppingBag
                size={55}
                className="text-white"
              />

            </div>

            <h2 className="text-4xl font-black text-gray-800">

              Your Cart is Empty

            </h2>

            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">

              Discover premium products and start building your perfect shopping experience.

            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-3 mt-8 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
            >

              Continue Shopping

              <ArrowRight size={20} />

            </Link>

          </div>

        ) : (

          <div className="space-y-8">

            {/* ================= CART ITEMS ================= */}
            {cartItems.map((item) => (

              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[36px] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  {/* LEFT */}
                  <div className="flex items-center gap-6">

                    {/* IMAGE */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-orange-50 h-32 w-32 flex items-center justify-center border border-pink-100">

                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                    </div>

                    {/* INFO */}
                    <div>

                      <p className="text-xs uppercase tracking-widest text-pink-500 font-bold mb-2">

                        Premium Product

                      </p>

                      <h3 className="text-2xl font-black text-gray-800">

                        {item.name}

                      </h3>

                      <p className="text-gray-500 mt-2">

                        Unit Price

                      </p>

                      <h2 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent mt-1">

                        ₹ {item.price}

                      </h2>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col md:flex-row items-center gap-6">

                    {/* QUANTITY */}
                    <div className="flex items-center gap-4 bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3">

                      <button
                        onClick={() => {

                          dispatch(
                            decreaseQty(item.id)
                          );

                          toast.success(
                            "Quantity decreased"
                          );
                        }}
                        className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-pink-100 transition"
                      >

                        <Minus size={18} />

                      </button>

                      <span className="text-xl font-bold text-gray-800 w-10 text-center">

                        {item.quantity}

                      </span>

                      <button
                        onClick={() => {

                          dispatch(
                            increaseQty(item.id)
                          );

                          toast.success(
                            "Quantity increased"
                          );
                        }}
                        className="h-10 w-10 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg flex items-center justify-center hover:opacity-90 transition"
                      >

                        <Plus size={18} />

                      </button>

                    </div>

                    {/* TOTAL */}
                    <div className="text-center">

                      <p className="text-gray-500 text-sm">

                        Item Total

                      </p>

                      <h2 className="text-3xl font-black text-gray-800 mt-1">

                        ₹ {item.price * item.quantity}

                      </h2>

                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => {

                        dispatch(
                          removeFromCart(item.id)
                        );

                        toast.error(
                          "Item removed from cart"
                        );
                      }}
                      className="flex items-center gap-2 bg-red-50 border border-red-100 hover:bg-red-100 text-red-500 px-5 py-3 rounded-2xl font-semibold transition-all duration-300"
                    >

                      <Trash2 size={18} />

                      Remove

                    </button>

                  </div>

                </div>

              </div>
            ))}

            {/* ================= ORDER SUMMARY ================= */}
            <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[36px] p-8 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT */}
              <div>

                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">

                  <ShieldCheck size={16} />

                  Secure Checkout

                </div>

                <h2 className="text-4xl font-black text-gray-800">

                  Order Summary

                </h2>

                <p className="text-gray-500 mt-3 text-lg">

                  Fast delivery and secure payment experience.

                </p>

              </div>

              {/* RIGHT */}
              <div className="text-center lg:text-right">

                <p className="text-gray-500 text-sm">

                  Grand Total

                </p>

                <h2 className="text-5xl font-black bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent mt-2">

                  ₹ {total.toFixed(2)}

                </h2>

                <Link
                  to="/checkout"
                  className="inline-flex items-center gap-3 mt-6 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
                >

                  Proceed to Checkout

                  <ArrowRight size={20} />

                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;
