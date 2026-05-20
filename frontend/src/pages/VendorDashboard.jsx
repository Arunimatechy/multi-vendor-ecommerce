

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/axios";
import toast from "react-hot-toast";

import {
  Store,
  Package,
  ShoppingCart,
  PlusCircle,
  Pencil,
  Eye,
} from "lucide-react";

function VendorDashboard() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("vendors/my-store/")
      .then((res) => {
        setStore(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to load store");
      });
  }, []);

  const dashboardItems = [
    {
      title: "Create Store",
      icon: <Store size={26} />,
      link: "/create-store",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Add Product",
      icon: <PlusCircle size={26} />,
      link: "/add-product",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "My Products",
      icon: <Package size={26} />,
      link: "/vendor-products",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={26} />,
      link: "/vendor-orders",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Edit Store",
      icon: <Pencil size={26} />,
      link: "/edit-store",
      color: "from-orange-500 to-amber-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= STORE SECTION ================= */}
        <div className="mb-12">
          {store ? (
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-pink-100 bg-white/70 backdrop-blur-2xl">

              {/* soft glow */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-300/20 blur-3xl rounded-full"></div>

              <img
                src={store.banner}
                className="w-full h-60 object-cover"
                alt="banner"
              />

              <div className="p-8 flex flex-col md:flex-row md:items-center gap-6">

                <img
                  src={store.logo}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
                  alt="logo"
                />

                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-semibold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Store Active
                  </div>

                  <h2 className="text-4xl font-black text-gray-800 mt-4">
                    {store.store_name}
                  </h2>

                  <p className="text-gray-500 mt-3 leading-relaxed max-w-xl">
                    {store.description}
                  </p>
                </div>

                <Link
                  to="/edit-store"
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  <Eye size={18} />
                  Manage
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[36px] p-12 shadow-xl border border-pink-100 text-center">
              <div className="text-7xl mb-4">🏪</div>

              <h2 className="text-4xl font-black text-gray-800">
                Create Your Store
              </h2>

              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Start selling products with your own premium online marketplace.
              </p>

              <Link
                to="/create-store"
                className="inline-flex items-center gap-3 mt-8 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
              >
                <Store size={20} />
                Create Store
              </Link>
            </div>
          )}
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div>
          <div className="mb-8">
            <h2 className="text-4xl font-black text-gray-800">
              Quick Actions
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Manage your business operations easily
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

            {dashboardItems.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={`group relative overflow-hidden bg-gradient-to-br ${item.color} rounded-[34px] p-8 text-white shadow-xl hover:scale-105 transition-all duration-300`}
              >

                {/* glow effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">

                  <div className="h-16 w-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-black">
                    {item.title}
                  </h3>

                  <p className="text-white/80 text-sm mt-2">
                    Open dashboard section
                  </p>

                </div>

              </Link>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default VendorDashboard;