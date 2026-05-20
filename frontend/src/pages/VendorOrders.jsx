



import { useEffect, useState } from "react";
import API from "../services/axios";
import toast from "react-hot-toast";

import {
  PackageCheck,
  User,
  ShoppingBag,
  IndianRupee,
  Truck,
} from "lucide-react";

function VendorOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    API.get("orders/vendor-orders/")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load orders");
        setLoading(false);
      });

  }, []);

  const updateStatus = async (orderItemId, status) => {

    try {

      await API.put(
        `orders/vendor-item-status/${orderItemId}/`,
        { status }
      );

      setOrders((prev) =>
        prev.map((item) =>
          item.order_item_id === orderItemId
            ? { ...item, status }
            : item
        )
      );

      toast.success("Status updated");

    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  const getStatusStyle = (status) => {

    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-purple-100 text-purple-700";
      case "packed":
        return "bg-pink-100 text-pink-700";
      case "shipped":
        return "bg-indigo-100 text-indigo-700";
      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";
      case "delivered":
        return "bg-emerald-100 text-emerald-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-orange-50">
        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 px-4 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HERO (cleaned UI) */}
        <div className="relative overflow-hidden rounded-[40px] bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 p-10 text-white shadow-2xl mb-10">

          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-300/20 blur-3xl rounded-full"></div>

          <div className="relative flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center shadow-lg">
              <PackageCheck size={38} />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Vendor Orders
              </h1>

              <p className="text-white/90 mt-2 text-base md:text-lg">
                Manage and track all incoming customer orders
              </p>
            </div>

          </div>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[36px] shadow-xl p-16 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-pink-500" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-3">
              Orders will appear here once customers purchase products
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {orders.map((order) => (

              <div
                key={order.order_item_id}
                className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-[30px] shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                {/* HEADER */}
                <div className="bg-linear-to-r from-pink-500 to-orange-400 p-6 text-white">

                  <div className="flex justify-between items-center">

                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">
                        Order #{order.order_id}
                      </h2>

                      <p className="text-white/80 text-sm">
                        Delivery Tracking
                      </p>
                    </div>

                    {/* STATUS */}
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-6 space-y-5">

                  {/* PRODUCT */}
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="text-pink-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-400">Product</p>
                      <h3 className="font-semibold text-gray-800">
                        {order.product}
                      </h3>
                    </div>
                  </div>

                  {/* CUSTOMER */}
                  <div className="flex items-center gap-3">
                    <User className="text-blue-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-400">Customer</p>
                      <h3 className="font-semibold text-gray-800">
                        {order.customer}
                      </h3>
                    </div>
                  </div>

                  {/* INFO BOXES */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4">
                      <p className="text-xs text-gray-500">Quantity</p>
                      <h3 className="text-lg font-bold text-gray-800">
                        {order.quantity}
                      </h3>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                      <p className="text-xs text-gray-500">Total</p>
                      <h3 className="text-lg font-bold text-pink-600 flex items-center gap-1">
                        <IndianRupee size={16} />
                        {order.total_price}
                      </h3>
                    </div>

                  </div>

                  {/* STATUS UPDATE */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Truck className="text-pink-500" size={18} />
                      Update Status
                    </label>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.order_item_id, e.target.value)
                      }
                      className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-400 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default VendorOrders;