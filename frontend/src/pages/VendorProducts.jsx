// import { useEffect, useState } from "react";
// import API from "../services/axios";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function VendorProducts() {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user, access } = useSelector((state) => state.auth);

//   useEffect(() => {

//     if (!access || user?.role !== "vendor") {
//       setLoading(false);
//       return;
//     }

//     API.get("products/vendor/my-products/")
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err.response?.data || err.message);
//         setLoading(false);
//       });

//   }, [access, user]);

//   const deleteProduct = async (id) => {

//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (!confirmDelete) return;

//     try {
//       await API.delete(`products/delete/${id}/`);

//       setProducts((prev) => prev.filter((p) => p.id !== id));

//       alert("Product deleted");

//     } catch (err) {
//       console.log(err);
//       alert("Delete failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
//         <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-b from-[#0a0f1c] via-[#0f172a] to-[#0a0f1c] py-10 px-4 text-white">

//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">

//           <div>
//             <h1 className="text-4xl font-bold tracking-tight">
//               My Products
//             </h1>
//             <p className="text-slate-400 mt-2">
//               Manage your vendor inventory
//             </p>
//           </div>

//           <Link
//             to="/add-product"
//             className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-medium transition"
//           >
//             + Add Product
//           </Link>

//         </div>

//         {/* EMPTY */}
//         {products.length === 0 ? (

//           <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-slate-300">
//             <h2 className="text-2xl font-bold mb-2">
//               No Products Found
//             </h2>
//             <p className="text-slate-400">
//               Start by adding your first product
//             </p>
//           </div>

//         ) : (

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//             {products.map((product) => (

//               <div
//                 key={product.id}
//                 className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition group"
//               >

//                 {/* IMAGE */}
//                 <div className="h-56 overflow-hidden bg-black/20">

//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                   />

//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-6">

//                   <h2 className="text-xl font-semibold">
//                     {product.name}
//                   </h2>

//                   <p className="text-indigo-300 font-bold mt-2">
//                     ₹ {product.price}
//                   </p>

//                   <p className="text-slate-400 mt-1 text-sm">
//                     Stock: {product.stock}
//                   </p>

//                   {/* BUTTONS */}
//                   <div className="flex gap-3 mt-5">

//                     <Link
//                       to={`/edit-product/${product.id}`}
//                       className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-center transition"
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       onClick={() => deleteProduct(product.id)}
//                       className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl transition"
//                     >
//                       Delete
//                     </button>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//         )}

//       </div>

//     </div>
//   );
// }

// export default VendorProducts;

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

  const { user, access } = useSelector(
    (state) => state.auth
  );

  // ================= FETCH PRODUCTS =================
  useEffect(() => {

    if (!access || user?.role !== "vendor") {

      setLoading(false);

      return;
    }

    API.get("products/vendor/my-products/")

      .then((res) => {

        setProducts(res.data);

        setLoading(false);

      })

      .catch((err) => {

        console.log(
          err.response?.data || err.message
        );

        setLoading(false);

      });

  }, [access, user]);

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `products/delete/${id}/`
      );

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );

      toast.success("Product deleted 🗑️");

    } catch (err) {

      console.log(err);

      toast.error("Delete failed ❌");
    }
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#fdf2f8] via-white to-[#fff7ed]">

        <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-linear-to-br from-[#fdf2f8] via-white to-[#fff7ed] py-10 px-4 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ================= HEADER ================= */}
        <div className="bg-white/70 backdrop-blur-2xl border border-pink-100 rounded-[36px] p-8 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <div className="inline-flex items-center gap-2 bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-5">

              <Boxes size={16} />

              Vendor Inventory

            </div>

            <h1 className="text-5xl font-black text-gray-800">

              My Products

            </h1>

            <p className="text-gray-500 mt-3 text-lg">

              Manage your products, pricing, stock,
              and inventory easily.

            </p>

          </div>

          {/* ADD PRODUCT BUTTON */}
          <Link
            to="/add-product"
            className="bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white px-7 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:scale-105"
          >

            <Plus size={20} />

            Add Product

          </Link>

        </div>

        {/* ================= EMPTY STATE ================= */}
        {
          products.length === 0 ? (

            <div className="bg-white/70 backdrop-blur-2xl border border-pink-100 rounded-[36px] p-16 text-center shadow-xl">

              <div className="h-28 w-28 mx-auto rounded-full bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center mb-8 shadow-xl">

                <Package
                  size={50}
                  className="text-white"
                />

              </div>

              <h2 className="text-4xl font-black text-gray-800 mb-4">

                No Products Found

              </h2>

              <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">

                Start growing your ecommerce business
                by adding your first premium product.

              </p>

              <Link
                to="/add-product"
                className="inline-flex items-center gap-3 mt-8 bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
              >

                <Plus size={20} />

                Add Product

              </Link>

            </div>

          ) : (

            /* ================= PRODUCT GRID ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                products.map((product) => (

                  <div
                    key={product.id}
                    className="group bg-white/70 backdrop-blur-2xl border border-pink-100 rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >

                    {/* IMAGE */}
                    <div className="relative h-72 bg-linear-to-br from-pink-50 to-orange-50 overflow-hidden flex items-center justify-center">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                      {/* STOCK BADGE */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md">

                        Stock: {product.stock}

                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      {/* CATEGORY */}
                      <p className="text-xs uppercase tracking-widest text-pink-500 font-bold mb-3">

                        Product

                      </p>

                      {/* NAME */}
                      <h2 className="text-2xl font-black text-gray-800 line-clamp-2">

                        {product.name}

                      </h2>

                      {/* PRICE */}
                      <div className="mt-5 flex items-center justify-between">

                        <h3 className="text-3xl font-black bg-linear-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">

                          ₹ {product.price}

                        </h3>

                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                          Active

                        </div>

                      </div>

                      {/* BUTTONS */}
                      <div className="grid grid-cols-2 gap-4 mt-7">

                        {/* EDIT */}
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                        >

                          <Pencil size={18} />

                          Edit

                        </Link>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                          className="flex items-center justify-center gap-2 bg-linear-to-r from-rose-500 to-red-600 hover:opacity-90 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                        >

                          <Trash2 size={18} />

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
}

export default VendorProducts;