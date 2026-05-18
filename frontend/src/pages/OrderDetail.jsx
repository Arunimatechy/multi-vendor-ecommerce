

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

  // ================= FETCH ORDER =================
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

  // ================= DELETE ORDER =================
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this order?"
    );

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

  // ================= CANCEL ORDER =================
  const handleCancel = async () => {

    const confirmCancel = window.confirm(
      "Cancel this order?"
    );

    if (!confirmCancel) return;

    try {

      await API.put(`orders/cancel/${id}/`);

      toast.success("Order cancelled ❌");

      fetchOrder();

    } catch (err) {

      console.log(err.response?.data);

      toast.error(
        err.response?.data?.error ||
        "Cancel failed ❌"
      );
    }
  };

  // ================= STATUS UI =================
  const statusStyles = {
    pending:
      "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30",

    processing:
      "bg-blue-400/20 text-blue-300 border border-blue-400/30",

    shipped:
      "bg-violet-400/20 text-violet-300 border border-violet-400/30",

    delivered:
      "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30",

    cancelled:
      "bg-red-400/20 text-red-300 border border-red-400/30",
  };

  const statusIcons = {
    pending: <Clock3 size={18} />,
    processing: <Package size={18} />,
    shipped: <Truck size={18} />,
    delivered: <CheckCircle2 size={18} />,
    cancelled: <XCircle size={18} />,
  };

  // ================= LOADING =================
  if (!order) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#fff7ed] via-[#ffffff] to-[#fdf2f8]">

        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

   <div className="min-h-screen bg-linear-to-br from-[#fff7ed] via-[#ffffff] to-[#fdf2f8] py-10 px-4 pb-32">

      <div className="max-w-5xl mx-auto mb-24">
        {/* HEADER */}
        <div className="bg-white border border-pink-100 shadow-xl rounded-4xl p-8 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">

                <ShoppingBag size={16} />

                Order Details

              </div>

              <h1 className="text-4xl font-black text-gray-800">

                Order #{order.id}

              </h1>

              <p className="text-gray-500 mt-2">

                View your complete order information

              </p>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/my-orders")}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-2xl font-semibold transition"
              >

                <ArrowLeft size={18} />

                Back

              </button>

              {order.status !== "delivered" &&
                order.status !== "cancelled" && (

                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-3 rounded-2xl font-semibold transition shadow-lg"
                >

                  <XCircle size={18} />

                  Cancel

                </button>
              )}

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition shadow-lg"
              >

                <Trash2 size={18} />

                Delete

              </button>

            </div>

          </div>

        </div>

        {/* STATUS + TOTAL */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* STATUS */}
          <div className="bg-white border border-pink-100 rounded-[28px] p-6 shadow-lg">

            <p className="text-gray-500 text-sm mb-3">
              Current Status
            </p>

            <div
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold capitalize ${
                statusStyles[order.status]
              }`}
            >

              {statusIcons[order.status]}

              {order.status}

            </div>

          </div>

          {/* TOTAL */}
          <div className="bg-linear-to-r from-pink-500 to-orange-400 rounded-[28px] p-6 shadow-xl text-white">

            <p className="text-white/80 text-sm">
              Total Amount
            </p>

            <h2 className="text-4xl font-black mt-2">

              ₹ {order.total_price}

            </h2>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="bg-white border border-pink-100 rounded-4xl p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <div className="h-12 w-12 rounded-2xl bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white">

              <Package size={22} />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-800">

                Ordered Items

              </h2>

              <p className="text-gray-500 text-sm">

                Products included in this order

              </p>

            </div>

          </div>

          <div className="space-y-5">

            {order.items?.map((item) => (

              <div
                key={item.id}
                className="border border-pink-100 rounded-3xl p-5 hover:shadow-lg transition bg-linear-to-r from-white to-pink-50/40"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

  <h3 className="text-xl font-bold text-gray-800">

    {item.product_name}

  </h3>

  <p className="text-gray-500 mt-2">

    Quantity: {item.quantity}

  </p>

  <p className="text-sm mt-2 text-pink-500 capitalize">

    Status: {item.vendor_status}

  </p>

</div>

                  <div className="text-left md:text-right">

                    <p className="text-gray-500 text-sm">
                      Price
                    </p>

                    <h2 className="text-2xl font-black text-pink-600">

                      ₹ {item.price}

                    </h2>

                  </div>

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