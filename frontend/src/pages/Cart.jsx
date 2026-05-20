




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

    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 py-12 px-4 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">

          <div>
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <ShoppingBag size={16} />
              Shopping Cart
            </div>

           <h1 className="text-3xl md:text-4xl font-black text-gray-800 mt-4">
              Your Cart
            </h1>

            <p className="text-gray-500 mt-2">
              Review items before checkout
            </p>
          </div>

          {cartItems.length > 0 && (
            <div className="bg-white/80 backdrop-blur-xl border border-pink-100 shadow-xl rounded-3xl px-8 py-6">
              <p className="text-gray-500 text-sm">Total Amount</p>
              <h2 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                ₹ {total.toFixed(2)}
              </h2>
            </div>
          )}

        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-4xl p-16 text-center shadow-2xl">

            <div className="h-28 w-28 mx-auto rounded-full bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-xl mb-8">
              <ShoppingBag size={48} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Add some premium products and start your shopping journey.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-3 mt-8 bg-linear-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {/* CART ITEMS */}
            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition group"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  {/* LEFT */}
                  <div className="flex items-center gap-5">

                    {/* IMAGE */}
                    <div className="h-28 w-28 rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 flex items-center justify-center">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    {/* INFO */}
                    <div>
                      <p className="text-xs text-pink-500 font-semibold uppercase">
                        Premium Item
                      </p>

                      <h3 className="text-xl font-bold text-gray-800 mt-1">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-2">
                        Unit Price
                      </p>

                      <p className="text-2xl font-black text-gray-900">
                        ₹ {item.price}
                      </p>
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col md:flex-row items-center gap-6">

                    {/* QUANTITY CONTROL */}
                    <div className="flex items-center bg-pink-50 border border-pink-100 rounded-2xl overflow-hidden shadow-sm">

                      <button
                        onClick={() => {
                          dispatch(decreaseQty(item.id));
                          toast.success("Decreased");
                        }}
                        className="px-4 py-3 hover:bg-pink-100 transition"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="px-5 font-bold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => {
                          dispatch(increaseQty(item.id));
                          toast.success("Increased");
                        }}
                        className="px-4 py-3 bg-linear-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                    {/* TOTAL */}
                    <div className="text-center min-w-30">
                      <p className="text-gray-500 text-sm">Total</p>
                      <p className="text-2xl font-black text-gray-900">
                        ₹ {item.price * item.quantity}
                      </p>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                        toast.error("Removed");
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

            {/* SUMMARY */}
            <div className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <ShieldCheck size={16} />
                  Secure Checkout
                </div>

                <h2 className="text-2xl font-bold mt-4 text-gray-800">
                  Order Summary
                </h2>

                <p className="text-gray-500 mt-2">
                  Fast and secure delivery experience
                </p>
              </div>

              <div className="text-right mt-6 lg:mt-0">

                <p className="text-gray-500 text-sm">
                  Grand Total
                </p>

                <h2 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                  ₹ {total.toFixed(2)}
                </h2>

                <Link
                  to="/checkout"
                  className="inline-flex items-center gap-3 mt-5 bg-linear-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
                >
                  Checkout
                  <ArrowRight size={18} />
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