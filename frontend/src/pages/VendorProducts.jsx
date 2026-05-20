



import { useEffect, useState } from "react";
import API from "../services/axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Package,
  Pencil,
  Trash2,
  Plus,
  Boxes,
} from "lucide-react";

function VendorProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, access } = useSelector((state) => state.auth);

  useEffect(() => {

    const fetchProducts = async () => {

      try {
        setLoading(true);

        const res = await API.get("products/vendor/my-products/");
        setProducts(Array.isArray(res.data) ? res.data : []);

      } catch (err) {
        console.log(err.response?.data || err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (!access || user?.role?.toLowerCase() !== "vendor") {
      setLoading(false);
      return;
    }

    fetchProducts();

  }, [access, user]);

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await API.delete(`products/delete/${id}/`);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );

      toast.success("Product deleted 🗑️");

    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Delete failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-orange-50">
        <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-12 px-4 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[40px] p-8 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

          <div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              <Boxes size={16} />
              Vendor Dashboard
            </div>

            <h1 className="text-5xl font-black text-gray-900 mt-4 tracking-tight">
              My Products
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage inventory, pricing, and stock with ease.
            </p>

          </div>

          <Link
            to="/add-product"
            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white px-7 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl transition-transform hover:scale-105"
          >
            <Plus size={20} />
            Add Product
          </Link>

        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[40px] p-16 text-center shadow-2xl">

            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-xl mb-6">
              <Package size={40} className="text-white" />
            </div>

            <h2 className="text-4xl font-black text-gray-900">
              No Products Yet
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Start building your store by adding your first product.
            </p>

            <Link
              to="/add-product"
              className="inline-flex items-center gap-3 mt-8 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
            >
              <Plus size={20} />
              Add Product
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((product) => (

              <div
                key={product.id}
                className="group bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >

                {/* IMAGE */}
                <div className="h-72 overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm">
                    Stock Available:{" "}
                    <span className="font-semibold text-gray-700">
                      {product.stock}
                    </span>
                  </p>

                  <h3 className="text-3xl font-black mt-4 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                    ₹ {product.price}
                  </h3>

                  {/* ACTIONS */}
                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <Link
                      to={`/edit-product/${product.id}`}
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

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

export default VendorProducts;