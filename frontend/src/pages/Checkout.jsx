


import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../services/axios";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  MapPin,
  Phone,
  User,
  Home,
  Hash,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Wallet,
  Tag,
  IndianRupee,
  Ticket,
} from "lucide-react";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // ================= ADDRESS =================
  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    pincode: "",
  });

  // ================= PAYMENT =================
  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  // ================= COUPON =================
  const [couponCode, setCouponCode] =
    useState("");

  const [couponData, setCouponData] =
    useState(null);

  const [loadingCoupon, setLoadingCoupon] =
    useState(false);

  // ================= COUPON LIST =================
  const [coupons, setCoupons] = useState([]);

  // ================= FETCH COUPONS =================
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await API.get("coupons/");

      setCoupons(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // ================= TOTAL =================
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  const discount = Number(
  couponData?.discount || 0
);

const total = Number(
  couponData?.final_amount || subtotal
);
  // ================= APPLY COUPON =================
  const applyCoupon = async (code = couponCode) => {
    if (!code) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      setLoadingCoupon(true);

     const res = await API.post(
  "coupons/apply/",
  {
    code,
    cart_total: subtotal,
  }
);

      setCouponData(res.data);

      setCouponCode(code);

      toast.success("Coupon applied");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.error ||
          "Invalid coupon"
      );

      setCouponData(null);
    } finally {
      setLoadingCoupon(false);
    }
  };

  
    

// ================= CREATE ORDER =================
const createOrder = async () => {
  if (!cartItems.length) {
    toast.error("Cart is empty");
    return null;
  }

  if (
    !address.full_name ||
    !address.phone ||
    !address.address_line ||
    !address.city ||
    !address.pincode
  ) {
    toast.error("Fill all address fields");
    return null;
  }

  const orderData = {
    items: cartItems
      .map((item) => {
        const productId =
          item.product_id ||
          item.product?.id ||
          item.id;

        return {
          product: Number(productId),
          quantity: item.quantity,
        };
      })
      .filter((item) => item.product), // remove invalid items

    address: address, // ✅ IMPORTANT FIX (backend expects "address")
    total: total,
  };

  try {
    const res = await API.post("orders/place/", orderData);
    return res.data;
  } catch (err) {
    console.log(err);

    toast.error(
      err.response?.data?.error || "Order failed"
    );

    return null;
  }
};
      
  

  // ================= COD =================
  const placeCODOrder = async () => {
    const order = await createOrder();

    if (!order) return;

    try {
      await API.post(
        `payments/cod/${order.id}/`
      );

      dispatch(clearCart());

      toast.success(
        "Order placed successfully"
      );

      navigate("/order-success");
    } catch (err) {
      console.log(err);

      toast.error("COD payment failed");
    }
  };

  // ================= RAZORPAY =================
  const handleRazorpayPayment =
    async () => {
      const order = await createOrder();

      if (!order) return;

      try {
        const res = await API.post(
          `payments/create-order/${order.id}/`
        );

        const data = res.data;

        if (!window.Razorpay) {
          toast.error(
            "Razorpay SDK not loaded"
          );
          return;
        }

        const options = {
          key: data.key,

          amount: data.amount,

          currency: "INR",

          order_id:
            data.razorpay_order_id,

          name: "Luxora",

          description:
            "Secure Payment",

          handler: async function (
            response
          ) {
            try {
              await API.post(
                "payments/success/",
                {
                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  payment_id:
                    data.payment_id,
                }
              );

              dispatch(clearCart());

              toast.success(
                "Payment successful"
              );

              navigate(
                "/order-success"
              );
            } catch (err) {
              console.log(err);

              toast.error(
                "Payment verification failed"
              );
            }
          },

          prefill: {
            name: address.full_name,
            contact: address.phone,
          },

          theme: {
            color: "#ec4899",
          },
        };

        new window.Razorpay(
          options
        ).open();
      } catch (err) {
        console.log(err);

        toast.error("Payment failed");
      }
    };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[30px] shadow-xl p-8 mb-8 border border-pink-100">
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
              <ShoppingBag
                className="text-white"
                size={30}
              />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                Checkout
              </h1>

              <p className="text-gray-500 mt-1">
                Complete your order securely
              </p>
            </div>

          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* ADDRESS */}
            <div className="bg-white rounded-[30px] shadow-xl border border-pink-100 p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">
                  <MapPin className="text-pink-500" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Shipping Address
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Enter delivery details
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <Input
                  icon={<User size={18} />}
                  name="full_name"
                  placeholder="Full Name"
                  onChange={handleChange}
                />

                <Input
                  icon={<Phone size={18} />}
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />

                <div className="md:col-span-2">
                  <Input
                    icon={<Home size={18} />}
                    name="address_line"
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>

                <Input
                  icon={<MapPin size={18} />}
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                />

                <Input
                  icon={<Hash size={18} />}
                  name="pincode"
                  placeholder="Pincode"
                  onChange={handleChange}
                />

              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-[30px] shadow-xl border border-pink-100 p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <CreditCard className="text-orange-500" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Payment Method
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Select your payment option
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                {/* COD */}
                <label
                  className={`flex items-center justify-between border rounded-2xl p-5 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-pink-400 bg-pink-50"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">
                      <Wallet className="text-pink-500" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800">
                        Cash On Delivery
                      </h3>

                      <p className="text-sm text-gray-500">
                        Pay when order arrives
                      </p>
                    </div>

                  </div>

                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() =>
                      setPaymentMethod("cod")
                    }
                  />

                </label>

                {/* RAZORPAY */}
                <label
                  className={`flex items-center justify-between border rounded-2xl p-5 cursor-pointer transition ${
                    paymentMethod ===
                    "razorpay"
                      ? "border-pink-400 bg-pink-50"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <ShieldCheck className="text-orange-500" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800">
                        Razorpay
                      </h3>

                      <p className="text-sm text-gray-500">
                        UPI, Cards & Wallets
                      </p>
                    </div>

                  </div>

                  <input
                    type="radio"
                    checked={
                      paymentMethod ===
                      "razorpay"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "razorpay"
                      )
                    }
                  />

                </label>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white rounded-[30px] shadow-xl border border-pink-100 p-8 sticky top-24">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* CART ITEMS */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover border"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-pink-500 flex items-center">
                      <IndianRupee size={16} />
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>
                ))}

              </div>

              {/* COUPON INPUT */}
              <div className="mt-6">

                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <Tag
                    size={18}
                    className="text-pink-500"
                  />
                  Apply Coupon
                </label>

                <div className="flex gap-2">

                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(
                        e.target.value
                      )
                    }
                    className="flex-1 border border-pink-100 bg-pink-50 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                  />

                  <button
                    onClick={() =>
                      applyCoupon()
                    }
                    disabled={loadingCoupon}
                    className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-5 rounded-2xl font-semibold"
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* COUPON LIST */}
              <div className="mt-6">

                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Ticket
                    size={18}
                    className="text-pink-500"
                  />
                  Available Coupons
                </h3>

                <div className="space-y-3">

                  {coupons.length > 0 ? (
                    coupons.map((coupon) => (

                      <div
                        key={coupon.id}
                        className="border border-pink-100 bg-pink-50 rounded-2xl p-4"
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <h4 className="font-bold text-pink-600">
                              {coupon.code}
                            </h4>

                            <p className="text-sm text-gray-600 mt-1">
                              {coupon.discount_type ===
                              "percentage"
                                ? `${coupon.discount_value}% OFF`
                                : `₹${coupon.discount_value} OFF`}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Min Order ₹
                              {
                                coupon.minimum_amount
                              }
                            </p>

                          </div>

                          <button
                            onClick={() =>
                              applyCoupon(
                                coupon.code
                              )
                            }
                            className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                          >
                            Use
                          </button>

                        </div>

                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No coupons available
                    </p>
                  )}

                </div>

              </div>

              {/* TOTALS */}
              <div className="border-t mt-6 pt-6 space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₹ {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>

                  <span>
                    - ₹ {discount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-extrabold text-gray-800">

                  <span>Total</span>

                  <span className="text-pink-500">
                    ₹ {total.toFixed(2)}
                  </span>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    paymentMethod ===
                    "razorpay"
                      ? handleRazorpayPayment()
                      : placeCODOrder()
                  }
                  className="mt-6 w-full bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                >

                  {paymentMethod ===
                  "razorpay"
                    ? "Pay Now"
                    : "Place Order"}

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

// ================= INPUT COMPONENT =================
function Input({ icon, ...props }) {
  return (
    <div className="relative">

      <div className="absolute left-4 top-4 text-gray-400">
        {icon}
      </div>

      <input
        {...props}
        className="w-full bg-pink-50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

    </div>
  );
}

export default Checkout;