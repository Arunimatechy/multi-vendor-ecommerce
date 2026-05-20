

import { useEffect, useState } from "react";
import API from "../services/axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Trash2,
  XCircle,
  Package,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function OrderDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`orders/${id}/`);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load order ❌");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this order?");
    if (!confirmDelete) return;

    try {
      await API.delete(`orders/delete/${id}/`);
      toast.success("Order deleted 🗑️");
      navigate("/my-orders");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed ❌");
    }
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm("Cancel this order?");
    if (!confirmCancel) return;

    try {
      await API.put(`orders/cancel/${id}/`);
      toast.success("Order cancelled ❌");
      fetchOrder();
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.error || "Cancel failed ❌");
    }
  };

  const statusStyles = {
    pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
    processing: "bg-blue-50 text-blue-600 border border-blue-200",
    shipped: "bg-violet-50 text-violet-600 border border-violet-200",
    delivered: "bg-green-50 text-green-600 border border-green-200",
    cancelled: "bg-red-50 text-red-600 border border-red-200",
  };

  const statusIcons = {
    pending: <Clock3 size={18} />,
    processing: <Package size={18} />,
    shipped: <Truck size={18} />,
    delivered: <CheckCircle2 size={18} />,
    cancelled: <XCircle size={18} />,
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-10 px-4">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
                <ShoppingBag size={16} />
                Order Details
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-800 mt-4">
                Order #{order.id}
              </h1>

              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Track your order status and items
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/my-orders")}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {order.status !== "delivered" &&
                order.status !== "cancelled" && (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  >
                    <XCircle size={18} />
                    Cancel
                  </button>
                )}

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          </div>
        </div>

        {/* STATUS + TOTAL */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* STATUS */}
          <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6">

            <p className="text-gray-500 text-sm mb-3">Current Status</p>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold capitalize ${statusStyles[order.status]}`}>
              {statusIcons[order.status]}
              {order.status}
            </div>

          </div>

          {/* TOTAL */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-3xl p-6 text-white shadow-xl">

            <p className="text-white/80 text-sm">Order Total</p>

            <h2 className="text-3xl md:text-4xl font-black mt-2">
              ₹ {order.total_price}
            </h2>

          </div>

        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 md:p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
              <Package size={20} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Ordered Items
              </h2>
              <p className="text-gray-500 text-sm">
                Products in this order
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {order.items?.map((item) => (

              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl border border-pink-100 bg-pink-50/30 hover:bg-pink-50 transition"
              >

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    {item.product_name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-xs mt-1 text-pink-500 capitalize">
                    Status: {item.vendor_status}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-gray-500 text-sm">Price</p>
                  <p className="text-xl md:text-2xl font-black text-pink-600">
                    ₹ {item.price}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderDetail;