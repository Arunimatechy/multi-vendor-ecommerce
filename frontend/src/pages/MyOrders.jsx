
import { useEffect, useState } from "react";
import API from "../services/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [canReviewMap, setCanReviewMap] = useState({});

  // ================= FETCH ORDERS =================
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await API.get(
          "orders/my-orders/"
        );

        setOrders(res.data);

      } catch (err) {

        console.log(err);

        toast.error(
          "Failed to load orders"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  // ================= CHECK REVIEW ELIGIBILITY =================
  useEffect(() => {

    if (!orders.length) return;

    const checkReviews = async () => {

      const newMap = {};

      for (const order of orders) {

        for (const item of order.items || []) {

          // ✅ ONLY DELIVERED ITEMS
          if (
            item.vendor_status !==
            "delivered"
          ) {
            continue;
          }

          const productId =
            typeof item.product === "object"
              ? item.product.id
              : item.product;

          try {

            const res = await API.get(
              `reviews/can-review/${productId}/`
            );

            newMap[productId] =
              res.data.can_review;

          } catch (err) {

            console.log(err);

            newMap[productId] = false;
          }
        }
      }

      setCanReviewMap(newMap);

    };

    checkReviews();

  }, [orders]);

  // ================= STATUS STYLE =================
  const statusStyles = {

    pending:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",

    processing:
      "bg-blue-100 text-blue-700 border border-blue-200",

    shipped:
      "bg-violet-100 text-violet-700 border border-violet-200",

    delivered:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",

    cancelled:
      "bg-red-100 text-red-700 border border-red-200",
  };

  const statusIcons = {

    pending:
      <Clock3 size={16} />,

    processing:
      <Package size={16} />,

    shipped:
      <Truck size={16} />,

    delivered:
      <CheckCircle2 size={16} />,

    cancelled:
      <XCircle size={16} />,
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

   <div className="min-h-screen bg-gray-50 py-10 px-4 pb-40 overflow-x-hidden overflow-y-auto">

     <div className="max-w-6xl mx-auto w-full">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">

          <div className="h-14 w-14 rounded-2xl bg-pink-500 flex items-center justify-center text-white">

            <ShoppingBag size={28} />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-800">

              My Orders

            </h1>

            <p className="text-gray-500">

              Track your orders and reviews

            </p>

          </div>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-700">

              No Orders Found

            </h2>

            <p className="text-gray-500 mt-2">

              Your orders will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white p-6 rounded-3xl shadow border border-gray-100"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">

                      Order #{order.id}

                    </h2>

                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mt-2 capitalize ${statusStyles[order.status]}`}
                    >

                      {statusIcons[order.status]}

                      {order.status}

                    </div>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-gray-500 text-sm">

                      Total Amount

                    </p>

                    <h2 className="text-2xl font-black text-pink-600">

                      ₹ {order.total_price}

                    </h2>

                  </div>

                </div>

                {/* ITEMS */}
                <div className="space-y-4">

                  {order.items?.map((item) => {

                    const product =
                      typeof item.product ===
                      "object"
                        ? item.product
                        : {
                            id: item.product,
                            name: item.product_name ||
                              "Product",
                          };

                    const productId =
                      product.id;

                    return (

                      <div
                        key={item.id}
                        className="border border-gray-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-50 overflow-hidden"
                      >

                        {/* PRODUCT INFO */}
                        <div>

                          <h3 className="font-bold text-gray-800 text-lg">

                            {product.name}

                          </h3>

                          <p className="text-sm text-gray-500 mt-1">

                            Quantity:
                            {" "}
                            {item.quantity}

                          </p>

                          {/* ✅ VENDOR STATUS */}
                          <p className="text-sm text-pink-500 mt-1 capitalize font-medium">

                            Status:
                            {" "}
                            {item.vendor_status}

                          </p>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex flex-col md:items-end gap-3">

                          <div>

                            <p className="text-gray-400 text-sm">

                              Price

                            </p>

                            <h2 className="text-xl font-bold text-pink-600">

                              ₹ {item.price}

                            </h2>

                          </div>

                          {/* ⭐ REVIEW BUTTON */}
                          {item.vendor_status ===
                            "delivered" &&
                            canReviewMap[
                              productId
                            ] === true && (

                            <Link
                              to={`/product/${productId}`}
                              state={{
                                scrollToReviews: true,
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                            >

                              ⭐ Write Review

                            </Link>
                          )}

                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* VIEW DETAILS */}
                <div className="mt-6">

                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
                  >

                    View Details →

                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyOrders;