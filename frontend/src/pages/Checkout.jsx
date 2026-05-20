

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

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const [coupons, setCoupons] = useState([]);

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

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const discount = Number(couponData?.discount || 0);

  const total = Number(couponData?.final_amount || subtotal);

  const applyCoupon = async (code = couponCode) => {
    if (!code) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      setLoadingCoupon(true);

      const res = await API.post("coupons/apply/", {
        code,
        cart_total: subtotal,
      });

      setCouponData(res.data);
      setCouponCode(code);

      toast.success("Coupon applied");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid coupon");
      setCouponData(null);
    } finally {
      setLoadingCoupon(false);
    }
  };

  const createOrder = async () => {
    if (!cartItems.length) {
      toast.error("Cart is empty");
      return null;
    }

    const orderData = {
      items: cartItems
        .map((item) => ({
          product: Number(item.product_id || item.product?.id || item.id),
          quantity: item.quantity,
        }))
        .filter((item) => item.product),

      address: address,
      total: total,
    };

    try {
      const res = await API.post("orders/place/", orderData);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.error || "Order failed");
      return null;
    }
  };

  const placeCODOrder = async () => {
    const order = await createOrder();
    if (!order) return;

    dispatch(clearCart());
    toast.success("Order placed successfully");
    navigate(`/order-success/${order.id}`);
  };

  const handleRazorpayPayment = async () => {
    const order = await createOrder();
    if (!order) return;

    try {
      const res = await API.post(`payments/create-order/${order.id}/`);
      const data = res.data;

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.razorpay_order_id,

        name: "Luxora",
        description: "Secure Payment",

        handler: async function (response) {
          try {
            await API.post("payments/success/", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              payment_id: data.payment_id,
            });

            dispatch(clearCart());
            toast.success("Payment successful");
            navigate("/order-success");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[28px] shadow-lg p-7 mb-8 border border-pink-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">Checkout</h1>
              <p className="text-gray-500 text-sm">Complete your order securely</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* ADDRESS */}
            <div className="bg-white rounded-[28px] shadow-lg border border-pink-100 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
                  <MapPin className="text-pink-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                  <p className="text-sm text-gray-500">Enter delivery details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input icon={<User size={18} />} name="full_name" placeholder="Full Name" onChange={handleChange} />
                <Input icon={<Phone size={18} />} name="phone" placeholder="Phone Number" onChange={handleChange} />
                <div className="md:col-span-2">
                  <Input icon={<Home size={18} />} name="address_line" placeholder="Address" onChange={handleChange} />
                </div>
                <Input icon={<MapPin size={18} />} name="city" placeholder="City" onChange={handleChange} />
                <Input icon={<Hash size={18} />} name="pincode" placeholder="Pincode" onChange={handleChange} />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-[28px] shadow-lg border border-pink-100 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                  <CreditCard className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                  <p className="text-sm text-gray-500">Select payment option</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className={`flex justify-between p-4 rounded-2xl border cursor-pointer ${paymentMethod==="cod"?"border-pink-400 bg-pink-50":"border-gray-200"}`}>
                  <div className="flex items-center gap-3">
                    <Wallet className="text-pink-500" />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500">Pay on delivery</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod==="cod"} onChange={()=>setPaymentMethod("cod")} />
                </label>

                <label className={`flex justify-between p-4 rounded-2xl border cursor-pointer ${paymentMethod==="razorpay"?"border-pink-400 bg-pink-50":"border-gray-200"}`}>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-orange-500" />
                    <div>
                      <h3 className="font-semibold">Razorpay</h3>
                      <p className="text-sm text-gray-500">UPI / Cards</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod==="razorpay"} onChange={()=>setPaymentMethod("razorpay")} />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-white rounded-[28px] shadow-lg border border-pink-100 p-6 sticky top-24">

              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* CART */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-pink-500 flex items-center">
                      <IndianRupee size={14} />
                      {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* COUPON INPUT */}
              <div className="mt-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Tag size={16} className="text-pink-500" />
                  Apply Coupon
                </h3>

                <div className="flex gap-2">
                  <input
                    className="w-full border rounded-xl px-3 py-2 bg-pink-50"
                    value={couponCode}
                    onChange={(e)=>setCouponCode(e.target.value)}
                    placeholder="Enter code"
                  />
                  <button onClick={()=>applyCoupon()} className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 rounded-xl">
                    Apply
                  </button>
                </div>
              </div>

              {/* AVAILABLE COUPONS (IMPROVED UI LIKE IMAGE) */}
              <div className="mt-6">
                <h3 className="font-bold flex items-center gap-2 mb-3">
                  <Ticket size={16} className="text-pink-500" />
                  Available Coupons
                </h3>

                <div className="space-y-3">
                  {coupons.length ? coupons.map(coupon => (
                    <div key={coupon.id} className="p-4 rounded-2xl border bg-linear-to-r from-pink-50 to-white hover:shadow-md transition">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-pink-600">{coupon.code}</p>
                          <p className="text-sm text-gray-600">
                            {coupon.discount_type==="percentage"
                              ? `${coupon.discount_value}% OFF`
                              : `₹${coupon.discount_value} OFF`}
                          </p>
                          <p className="text-xs text-gray-500">Min ₹{coupon.minimum_amount}</p>
                        </div>

                        <button
                          onClick={()=>applyCoupon(coupon.code)}
                          className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-xl text-sm"
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-500">No coupons available</p>
                  )}
                </div>
              </div>

              {/* TOTAL */}
              <div className="border-t mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600 text-sm">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-pink-500">₹{total}</span>
                </div>

                <button
                  onClick={() =>
                    paymentMethod==="razorpay"
                      ? handleRazorpayPayment()
                      : placeCODOrder()
                  }
                  className="w-full mt-4 bg-linear-to-r from-pink-500 to-orange-400 text-white py-3 rounded-2xl font-bold"
                >
                  {paymentMethod==="razorpay" ? "Pay Now" : "Place Order"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// INPUT
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-3 rounded-xl border bg-pink-50 focus:ring-2 focus:ring-pink-400 outline-none"
      />
    </div>
  );
}

export default Checkout;












