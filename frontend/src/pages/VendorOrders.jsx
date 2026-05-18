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

  // ================= FETCH ORDERS =================
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

  // ================= UPDATE STATUS =================
  const updateStatus = async (
    orderItemId,
    status
  ) => {

    try {

      await API.put(
        `orders/vendor-item-status/${orderItemId}/`,
        {
          status,
        }
      );

      // ✅ UPDATE UI
      setOrders((prev) =>
        prev.map((item) =>
          item.order_item_id === orderItemId
            ? {
                ...item,
                status: status,
              }
            : item
        )
      );

      toast.success("Status updated");

    } catch (err) {

      console.log(err);

      toast.error("Update failed");
    }
  };

  // ================= STATUS COLORS =================
  const getStatusStyle = (status) => {

    switch (status) {

      case "pending":
        return "bg-yellow-100 text-yellow-600";

      case "confirmed":
        return "bg-blue-100 text-blue-600";

      case "processing":
        return "bg-purple-100 text-purple-600";

      case "packed":
        return "bg-pink-100 text-pink-600";

      case "shipped":
        return "bg-indigo-100 text-indigo-600";

      case "out_for_delivery":
        return "bg-orange-100 text-orange-600";

      case "delivered":
        return "bg-emerald-100 text-emerald-600";

      case "cancelled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-orange-50">

        <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[36px] bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 p-10 text-white shadow-2xl mb-10">

          <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">

              <PackageCheck size={40} />

            </div>

            <div>

              <h1 className="text-5xl font-extrabold">

                Vendor Orders

              </h1>

              <p className="text-white/90 mt-3 text-lg">

                Manage orders and update delivery status

              </p>

            </div>

          </div>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white border border-pink-100 rounded-4xl shadow-xl p-16 text-center">

            <div className="flex justify-center mb-5">

              <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center">

                <ShoppingBag
                  size={42}
                  className="text-pink-500"
                />

              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">

              No Orders Found

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

              Orders will appear here once customers buy products.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {orders.map((order) => (

              <div
                key={order.order_item_id}
                className="bg-white border border-pink-100 rounded-[30px] shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                {/* HEADER */}
                <div className="bg-linear-to-r from-pink-500 to-orange-400 p-6 text-white">

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-2xl font-bold">

                        Order #{order.order_id}

                      </h2>

                      <p className="text-white/80 text-sm">

                        Delivery Tracking

                      </p>

                    </div>

                    {/* ✅ STATUS */}
                    <span
                      className={`px-4 py-2 rounded-2xl text-sm font-semibold bg-white ${getStatusStyle(
                        order.status
                      )}`}
                    >

                      {order.status}

                    </span>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-7 space-y-5">

                  {/* PRODUCT */}
                  <div className="flex items-center gap-3">

                    <ShoppingBag className="text-pink-500" />

                    <div>

                      <p className="text-gray-400 text-sm">

                        Product

                      </p>

                      <h3 className="font-bold">

                        {order.product}

                      </h3>

                    </div>

                  </div>

                  {/* CUSTOMER */}
                  <div className="flex items-center gap-3">

                    <User className="text-blue-500" />

                    <div>

                      <p className="text-gray-400 text-sm">

                        Customer

                      </p>

                      <h3 className="font-bold">

                        {order.customer}

                      </h3>

                    </div>

                  </div>

                  {/* QUANTITY + PRICE */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-pink-50 p-4 rounded-2xl">

                      <p className="text-sm text-gray-500">

                        Quantity

                      </p>

                      <h3 className="text-xl font-bold">

                        {order.quantity}

                      </h3>

                    </div>

                    <div className="bg-orange-50 p-4 rounded-2xl">

                      <p className="text-sm text-gray-500">

                        Total

                      </p>

                      <h3 className="text-xl font-bold text-pink-500 flex items-center gap-1">

                        <IndianRupee size={18} />

                        {order.total_price}

                      </h3>

                    </div>

                  </div>

                  {/* STATUS UPDATE */}
                  <div>

                    <label className="flex items-center gap-2 font-semibold mb-2">

                      <Truck className="text-pink-500" />

                      Update Status

                    </label>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order.order_item_id,
                          e.target.value
                        )
                      }
                      className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3"
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="packed">
                        Packed
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="out_for_delivery">
                        Out for Delivery
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>

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