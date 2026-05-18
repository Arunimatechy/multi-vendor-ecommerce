

// // import { useEffect, useState } from "react";

// // import API from "../services/axios";

// // import ProductCard from "../components/ProductCard";

// // function Home() {

// //   const [products, setProducts] = useState([]);

// //   const [search, setSearch] = useState("");

// //   const [category, setCategory] = useState("");

// //   const [sort, setSort] = useState("");

// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {

// //     const timer = setTimeout(async () => {

// //       setLoading(true);

// //       try {

// //         let url = "products/?";

// //         if (search) url += `search=${search}&`;

// //         if (category) url += `category=${category}&`;

// //         if (sort) url += `sort=${sort}`;

// //         const res = await API.get(url);

// //         setProducts(res.data);

// //       } catch (err) {

// //         console.log(err);

// //       } finally {

// //         setLoading(false);

// //       }

// //     }, 500);

// //     return () => clearTimeout(timer);

// //   }, [search, category, sort]);

// //   return (

// //     <div className="min-h-screen bg-gradient-to-br from-[#fff1f2] via-[#ffffff] to-[#fff7ed] py-10 px-4 overflow-hidden relative">

// //       {/* BACKGROUND GLOW */}
// //       <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

// //       <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

// //       <div className="max-w-7xl mx-auto relative z-10">

// //         {/* HERO SECTION */}
// //         <div className="relative overflow-hidden rounded-[40px] p-12 mb-10 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-[0_20px_80px_rgba(236,72,153,0.35)]">

// //           {/* GLOW */}
// //           <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>

// //           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl"></div>

// //           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

// //             {/* LEFT CONTENT */}
// //             <div>

// //               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/20 backdrop-blur-md text-sm font-semibold mb-6">

// //                 ✨ Premium Multi Vendor Platform

// //               </div>

// //               <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">

// //                 Luxora Marketplace

// //               </h1>

// //               <p className="mt-6 text-lg text-white/90 max-w-2xl leading-relaxed">

// //                 Discover premium products from trusted vendors
// //                 with a luxurious modern shopping experience built
// //                 for style, speed, and simplicity.

// //               </p>

// //               {/* BUTTONS */}
// //               <div className="mt-8 flex flex-wrap gap-4">

// //                 <button className="bg-white text-pink-600 hover:bg-pink-50 px-7 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105">

// //                   Explore Products

// //                 </button>

// //                 <button className="bg-white/15 hover:bg-white/20 border border-white/20 px-7 py-3 rounded-2xl font-semibold backdrop-blur-md transition-all duration-300">

// //                   Become Vendor

// //                 </button>

// //               </div>

// //             </div>

// //             {/* RIGHT STATS */}
// //             <div className="grid grid-cols-2 gap-5 min-w-[300px]">

// //               <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

// //                 <h2 className="text-4xl font-black">

// //                   10K+

// //                 </h2>

// //                 <p className="text-white/80 mt-2">

// //                   Products

// //                 </p>

// //               </div>

// //               <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

// //                 <h2 className="text-4xl font-black">

// //                   500+

// //                 </h2>

// //                 <p className="text-white/80 mt-2">

// //                   Vendors

// //                 </p>

// //               </div>

// //               <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

// //                 <h2 className="text-4xl font-black">

// //                   24/7

// //                 </h2>

// //                 <p className="text-white/80 mt-2">

// //                   Support

// //                 </p>

// //               </div>

// //               <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

// //                 <h2 className="text-4xl font-black">

// //                   99%

// //                 </h2>

// //                 <p className="text-white/80 mt-2">

// //                   Satisfaction

// //                 </p>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //         {/* SEARCH + FILTER */}
// //         <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 shadow-xl p-6 rounded-[32px] mb-8 flex flex-col md:flex-row gap-4">

// //           {/* SEARCH */}
// //           <input
// //             type="text"
// //             placeholder="Search luxury products..."
// //             className="bg-pink-50/80 text-gray-800 placeholder-gray-500 p-4 rounded-2xl w-full outline-none border border-pink-100 focus:ring-2 focus:ring-pink-400"
// //             onChange={(e) => setSearch(e.target.value)}
// //           />

// //           {/* CATEGORY */}
// //           <select
// //             className="bg-pink-50/80 text-gray-800 p-4 rounded-2xl outline-none border border-pink-100 focus:ring-2 focus:ring-pink-400"
// //             onChange={(e) => setCategory(e.target.value)}
// //           >

// //             <option value="">Select Category</option>

// //             <option value="spices">Spices</option>

// //             <option value="fashion">Fashion</option>

// //             <option value="vegetables">Vegetables</option>

// //             <option value="fruits">Fruits</option>

// //             <option value="bakery">Bakery</option>

// //             <option value="beauty">Beauty & Personal Care</option>

// //             <option value="home">Home Essentials</option>

// //             <option value="stationery">Stationery</option>

// //           </select>

// //           {/* SORT */}
// //           <select
// //             className="bg-pink-50/80 text-gray-800 p-4 rounded-2xl outline-none border border-pink-100 focus:ring-2 focus:ring-pink-400"
// //             onChange={(e) => setSort(e.target.value)}
// //           >

// //             <option value="">Default</option>

// //             <option value="low">Price Low → High</option>

// //             <option value="high">Price High → Low</option>

// //           </select>

// //         </div>

// //         {/* LOADING */}
// //         {
// //           loading && (

// //             <div className="flex justify-center py-24">

// //               <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

// //             </div>
// //           )
// //         }

// //         {/* EMPTY */}
// //         {
// //           !loading && products.length === 0 && (

// //             <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 p-14 text-center rounded-[36px] shadow-xl">

// //               <h2 className="text-4xl font-black text-gray-800">

// //                 No Products Found

// //               </h2>

// //               <p className="text-gray-500 mt-4 text-lg">

// //                 Try adjusting your search or category filters

// //               </p>

// //             </div>
// //           )
// //         }

// //         {/* PRODUCTS */}
// //         {
// //           !loading && products.length > 0 && (

// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

// //               {
// //                 products.map((product) => (

// //                   <ProductCard
// //                     key={product.id}
// //                     product={product}
// //                   />

// //                 ))
// //               }

// //             </div>
// //           )
// //         }

// //       </div>

// //     </div>
// //   );
// // }

// // export default Home;

// import { useEffect, useState } from "react";
// import API from "../services/axios";
// import ProductCard from "../components/ProductCard";

// function Home() {
//   const [products, setProducts] = useState(null); // ✅ IMPORTANT FIX
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchProducts = async () => {
//       setLoading(true);

//       try {
//         let url = "products/?";

//         if (search) url += `search=${search}&`;
//         if (category) url += `category=${category}&`;
//         if (sort) url += `sort=${sort}`;

//         const res = await API.get(url, {
//           signal: controller.signal,
//         });

//         setProducts(res.data);
//       } catch (err) {
//         if (err.name !== "CanceledError") {
//           console.log(err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();

//     return () => controller.abort();
//   }, [search, category, sort]);

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fff1f2] via-[#ffffff] to-[#fff7ed] py-10 px-4 overflow-hidden relative">

//       {/* BACKGROUND GLOW */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

//       <div className="max-w-7xl mx-auto relative z-10">

//         {/* HERO */}
//         <div className="relative overflow-hidden rounded-[40px] p-12 mb-10 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-[0_20px_80px_rgba(236,72,153,0.35)]">

//           <h1 className="text-5xl font-black">
//             Luxora Marketplace
//           </h1>

//           <p className="mt-4 text-white/90">
//             Discover premium products from trusted vendors
//           </p>
//         </div>

//         {/* SEARCH + FILTER */}
//         <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 shadow-xl p-6 rounded-[32px] mb-8 flex flex-col md:flex-row gap-4">

//           <input
//             type="text"
//             placeholder="Search products..."
//             className="p-4 rounded-2xl w-full border border-pink-100"
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             className="p-4 rounded-2xl border border-pink-100"
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="spices">Spices</option>
//             <option value="fashion">Fashion</option>
//             <option value="vegetables">Vegetables</option>
//             <option value="fruits">Fruits</option>
//           </select>

//           <select
//             className="p-4 rounded-2xl border border-pink-100"
//             onChange={(e) => setSort(e.target.value)}
//           >
//             <option value="">Default</option>
//             <option value="low">Low → High</option>
//             <option value="high">High → Low</option>
//           </select>

//         </div>

//         {/* EMPTY STATE (SAFE FIX) */}
//         {products && products.length === 0 && (
//           <div className="bg-white p-14 text-center rounded-[36px] shadow-xl">
//             <h2 className="text-4xl font-black text-gray-800">
//               No Products Found
//             </h2>
//             <p className="text-gray-500 mt-4">
//               Try adjusting your filters
//             </p>
//           </div>
//         )}

//         {/* PRODUCTS */}
//         {products && products.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Home;
import { useEffect, useState } from "react";
import API from "../services/axios";
import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {

    const controller = new AbortController();

    const delayDebounce = setTimeout(() => {

      fetchProducts(controller);

    }, 400); // ✅ prevent lag while typing

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };

  }, [search, category, sort]);

  // ================= API FUNCTION =================
  const fetchProducts = async (controller) => {

    setLoading(true);

    try {

      let params = [];

      // ✅ SEARCH
      if (search.trim()) {
        params.push(
          `search=${encodeURIComponent(search)}`
        );
      }

      // ✅ CATEGORY
      if (category) {
        params.push(
          `category=${encodeURIComponent(category)}`
        );
      }

      // ✅ SORT
      if (sort) {
        params.push(`sort=${sort}`);
      }

      // ✅ FINAL URL
      const url =
        `products/?${params.join("&")}`;

      const res = await API.get(url, {
        signal: controller.signal,
      });

      setProducts(res.data);

    } catch (err) {

      // ✅ Ignore cancelled requests
      if (
        err.name !== "CanceledError" &&
        err.code !== "ERR_CANCELED"
      ) {
        console.log(err);
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-linear-to-br from-[#fff1f2] via-[#ffffff] to-[#fff7ed] py-10 px-4 overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[40px] p-12 mb-10 bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-[0_20px_80px_rgba(236,72,153,0.35)]">

          <h1 className="text-5xl font-black">
            Luxora Marketplace
          </h1>

          <p className="mt-4 text-white/90 text-lg">
            Discover premium products from trusted vendors
          </p>

        </div>

        {/* SEARCH + FILTER */}
        <div className="bg-white/80 backdrop-blur-2xl border border-pink-100 shadow-xl p-6 rounded-4xl mb-8 flex flex-col md:flex-row gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="p-4 rounded-2xl w-full border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="p-4 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          >

            <option value="">
              Select Category
            </option>

            <option value="spices">
              Spices
            </option>

            <option value="fashion">
              Fashion
            </option>

            <option value="vegetables">
              Vegetables
            </option>

            <option value="fruits">
              Fruits
            </option>
 <option value="bakery">
                  Bakery
                </option>

                <option value="beauty">
                  Beauty & Personal Care
                </option>

                <option value="home">
                  Home Essentials
                </option>

                <option value="stationery">
                  Stationery
                </option>
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="p-4 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          >

            <option value="">
              Default
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

          </select>

        </div>

        {/* LOADING */}
        {loading && (

          <div className="flex justify-center items-center py-20">

            <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

          </div>
        )}

        {/* NO PRODUCTS */}
        {!loading &&
          products.length === 0 && (

          <div className="bg-white p-14 text-center rounded-[36px] shadow-xl">

            <h2 className="text-4xl font-black text-gray-800">

              No Products Found

            </h2>

            <p className="text-gray-500 mt-4">

              Try adjusting your filters

            </p>

          </div>
        )}

        {/* PRODUCTS */}
        {!loading &&
          products.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Home;