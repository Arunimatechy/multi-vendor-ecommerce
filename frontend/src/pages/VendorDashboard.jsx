



// import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";

// import API from "../services/axios";

// import toast from "react-hot-toast";

// import {
//   Store,
//   Package,
//   ShoppingCart,
//   PlusCircle,
//   Pencil,
//   TrendingUp,
//   DollarSign,
//   Eye,
// } from "lucide-react";

// function VendorDashboard() {

//   const [store, setStore] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     API.get("vendors/my-store/")

//       .then((res) => {

//         setStore(res.data);

//         setLoading(false);

//         toast.success(
//           "Vendor store loaded successfully 🏪"
//         );
//       })

//       .catch((err) => {

//         console.log(
//           err?.response?.data || err.message
//         );

//         setLoading(false);

//         toast.error(
//           "Failed to load vendor store ❌"
//         );
//       });

//   }, []);

//   useEffect(() => {

//     if (!loading && !store) {

//       toast(
//         "No store found. Please create your store 🏪"
//       );
//     }

//   }, [loading, store]);

//   const dashboardItems = [

//     {
//       title: "Create Store",
//       icon: <Store size={34} />,
//       link: "/create-store",
//       color: "from-cyan-600 via-blue-700 to-indigo-900",
//     },

//     {
//       title: "Edit Store",
//       icon: <Pencil size={34} />,
//       link: "/edit-store",
//       color: "from-fuchsia-600 via-pink-700 to-rose-900",
//     },

//     {
//       title: "Add Product",
//       icon: <PlusCircle size={34} />,
//       link: "/add-product",
//       color: "from-emerald-500 via-green-600 to-emerald-900",
//     },

//     {
//       title: "My Products",
//       icon: <Package size={34} />,
//       link: "/vendor-products",
//       color: "from-violet-600 via-purple-700 to-indigo-900",
//     },

//     {
//       title: "Orders",
//       icon: <ShoppingCart size={34} />,
//       link: "/vendor-orders",
//       color: "from-rose-600 via-red-700 to-red-950",
//     },
//   ];

//   if (loading) {

//     return (

//       <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

//         <div className="h-16 w-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>

//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-linear-to-b from-[#020617] via-[#0f172a] to-[#020617] py-10 px-4 text-white overflow-hidden">

//       {/* BACKGROUND GLOW */}
//       <div className="fixed top-0 left-0 w-125 h-125 bg-violet-600/20 rounded-full blur-3xl"></div>

//       <div className="fixed bottom-0 right-0 w-125 h-125 bg-cyan-600/20 rounded-full blur-3xl"></div>

//       <div className="max-w-7xl mx-auto relative z-10">

//         {/* PREMIUM HEADER */}
//         <div className="relative overflow-hidden bg-linear-to-r from-violet-700 via-indigo-700 to-blue-700 rounded-[36px] p-10 shadow-[0_0_50px_rgba(79,70,229,0.35)] mb-10 border border-white/10">

//           {/* GLOW EFFECTS */}
//           <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

//           <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

//           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

//             <div>

//               <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-5 backdrop-blur-md">

//                 <TrendingUp size={18} />

//                 <span className="text-sm font-medium text-white/80">

//                   Premium Vendor Panel

//                 </span>

//               </div>

//               <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight">

//                 Vendor Dashboard

//               </h1>

//               <p className="text-white/70 mt-5 text-lg max-w-2xl leading-relaxed">

//                 Manage your ecommerce business, products,
//                 orders, inventory, analytics, and store branding
//                 from one modern premium dashboard.

//               </p>

//             </div>

//             {/* QUICK STATS */}
//             <div className="grid grid-cols-2 gap-4 min-w-[320px]">

//               <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300">

//                 <div className="flex items-center gap-3">

//                   <DollarSign className="text-emerald-300" />

//                   <p className="text-white/70 text-sm">
//                     Revenue
//                   </p>

//                 </div>

//                 <h2 className="text-3xl font-black mt-4">
//                   ₹0
//                 </h2>

//               </div>

//               <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300">

//                 <div className="flex items-center gap-3">

//                   <Package className="text-violet-300" />

//                   <p className="text-white/70 text-sm">
//                     Products
//                   </p>

//                 </div>

//                 <h2 className="text-3xl font-black mt-4">
//                   --
//                 </h2>

//               </div>

//               <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300">

//                 <div className="flex items-center gap-3">

//                   <ShoppingCart className="text-amber-300" />

//                   <p className="text-white/70 text-sm">
//                     Orders
//                   </p>

//                 </div>

//                 <h2 className="text-3xl font-black mt-4">
//                   --
//                 </h2>

//               </div>

//               <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300">

//                 <div className="flex items-center gap-3">

//                   <TrendingUp className="text-pink-300" />

//                   <p className="text-white/70 text-sm">
//                     Growth
//                   </p>

//                 </div>

//                 <h2 className="text-3xl font-black mt-4">
//                   +0%
//                 </h2>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* STORE SECTION */}
//         {store ? (

//           <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-[36px] shadow-[0_0_40px_rgba(255,255,255,0.04)] overflow-hidden mb-10">

//             {/* BANNER */}
//             <div className="relative">

//               <img
//                 src={store.banner}
//                 className="w-full h-80 object-cover"
//                 alt="banner"
//               />

//               <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-black/40 to-transparent"></div>

//             </div>

//             {/* STORE INFO */}
//             <div className="p-8 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">

//               <div className="flex flex-col sm:flex-row gap-6 sm:items-center">

//                 <img
//                   src={store.logo}
//                   className="w-36 h-36 rounded-full border-4 border-white/20 object-cover shadow-2xl"
//                   alt="logo"
//                 />

//                 <div>

//                   <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4">

//                     <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>

//                     <span className="text-emerald-300 text-sm font-medium">

//                       Active Store

//                     </span>

//                   </div>

//                   <h2 className="text-4xl font-black">

//                     {store.store_name}

//                   </h2>

//                   <p className="text-white/70 mt-4 max-w-2xl leading-relaxed text-lg">

//                     {store.description}

//                   </p>

//                   <p className="text-white/40 mt-3">

//                     📍 {store.address}

//                   </p>

//                 </div>

//               </div>

//               {/* ACTION BUTTON */}
//               <Link
//                 to="/edit-store"
//                 className="bg-linear-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105"
//               >

//                 <Eye size={20} />

//                 Manage Store

//               </Link>

//             </div>

//           </div>

//         ) : (

//           <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-[36px] p-14 text-center mb-10 shadow-xl">

//             <div className="text-7xl mb-6">
//               🏪
//             </div>

//             <h2 className="text-5xl font-black mb-5">

//               No Store Created

//             </h2>

//             <p className="text-white/60 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">

//               Create your premium ecommerce store and start
//               selling products to customers around the world.

//             </p>

//             <Link
//               to="/create-store"
//               className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105"
//             >

//               <Store size={22} />

//               Create Store

//             </Link>

//           </div>
//         )}

//         {/* ACTION CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

//           {dashboardItems.map((item, i) => (

//             <Link
//               key={i}
//               to={item.link}
//               className={`group relative overflow-hidden bg-linear-to-br ${item.color} p-8 rounded-4xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10`}
//             >

//               {/* CARD GLOW */}
//               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

//               <div className="relative z-10">

//                 <div className="mb-8 text-white group-hover:scale-110 transition duration-300">

//                   {item.icon}

//                 </div>

//                 <h3 className="text-2xl font-black">

//                   {item.title}

//                 </h3>

//                 <p className="text-white/70 text-sm mt-3 leading-relaxed">

//                   Manage and control your store operations

//                 </p>

//               </div>

//             </Link>
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default VendorDashboard;


// import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";

// import API from "../services/axios";

// import toast from "react-hot-toast";

// import {
//   Store,
//   Package,
//   ShoppingCart,
//   PlusCircle,
//   Pencil,
//   TrendingUp,
//   Eye,
//   Boxes,
//   BadgeDollarSign,
// } from "lucide-react";

// function VendorDashboard() {

//   const [store, setStore] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     API.get("vendors/my-store/")

//       .then((res) => {

//         setStore(res.data);

//         setLoading(false);

//       })

//       .catch((err) => {

//         console.log(err);

//         setLoading(false);

//         toast.error("Failed to load store");

//       });

//   }, []);

//   const dashboardItems = [

//     {
//       title: "Create Store",
//       icon: <Store size={30} />,
//       link: "/create-store",
//       color: "from-pink-500 to-rose-500",
//     },

//     {
//       title: "Edit Store",
//       icon: <Pencil size={30} />,
//       link: "/edit-store",
//       color: "from-violet-500 to-purple-500",
//     },

//     {
//       title: "Add Product",
//       icon: <PlusCircle size={30} />,
//       link: "/add-product",
//       color: "from-emerald-500 to-green-500",
//     },

//     {
//       title: "My Products",
//       icon: <Package size={30} />,
//       link: "/vendor-products",
//       color: "from-orange-500 to-amber-500",
//     },

//     {
//       title: "Orders",
//       icon: <ShoppingCart size={30} />,
//       link: "/vendor-orders",
//       color: "from-cyan-500 to-blue-500",
//     },

//   ];

//   // ================= LOADING =================
//   if (loading) {

//     return (

//       <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">

//         <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#fdf2f8] py-10 px-4">

//       <div className="max-w-7xl mx-auto">

//         {/* ================= HEADER ================= */}
//         <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 rounded-[40px] p-10 shadow-2xl mb-10 text-white relative overflow-hidden">

//           {/* GLOW */}
//           <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

//           <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl"></div>

//           <div className="relative z-10">

//             <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-5">

//               <TrendingUp size={18} />

//               <span className="text-sm font-medium">

//                 Vendor Control Panel

//               </span>

//             </div>

//             <h1 className="text-5xl font-black leading-tight">

//               Vendor Dashboard

//             </h1>

//             <p className="mt-5 text-white/90 max-w-3xl text-lg leading-relaxed">

//               Manage products, orders, inventory, and your
//               online business with a modern premium dashboard.

//             </p>

//           </div>

//         </div>

//         {/* ================= SIMPLE STATS ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

//           {/* REVENUE */}
//           <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-gray-500 text-sm font-medium">

//                   Revenue

//                 </p>

//                 <h2 className="text-4xl font-black mt-3 text-pink-600">

//                   ₹0

//                 </h2>

//               </div>

//               <div className="h-14 w-14 rounded-2xl bg-pink-100 flex items-center justify-center">

//                 <BadgeDollarSign
//                   className="text-pink-500"
//                   size={28}
//                 />

//               </div>

//             </div>

//           </div>

//           {/* PRODUCTS */}
//           <div className="bg-white rounded-3xl p-6 shadow-lg border border-violet-100">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-gray-500 text-sm font-medium">

//                   Products

//                 </p>

//                 <h2 className="text-4xl font-black mt-3 text-violet-600">

//                   --

//                 </h2>

//               </div>

//               <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center">

//                 <Boxes
//                   className="text-violet-500"
//                   size={28}
//                 />

//               </div>

//             </div>

//           </div>

//           {/* ORDERS */}
//           <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-100">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-gray-500 text-sm font-medium">

//                   Orders

//                 </p>

//                 <h2 className="text-4xl font-black mt-3 text-orange-500">

//                   --

//                 </h2>

//               </div>

//               <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">

//                 <ShoppingCart
//                   className="text-orange-500"
//                   size={28}
//                 />

//               </div>

//             </div>

//           </div>

//           {/* GROWTH */}
//           <div className="bg-white rounded-3xl p-6 shadow-lg border border-emerald-100">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-gray-500 text-sm font-medium">

//                   Growth

//                 </p>

//                 <h2 className="text-4xl font-black mt-3 text-emerald-500">

//                   +0%

//                 </h2>

//               </div>

//               <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

//                 <TrendingUp
//                   className="text-emerald-500"
//                   size={28}
//                 />

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ================= STORE SECTION ================= */}
//         {store ? (

//           <div className="bg-white rounded-[40px] shadow-xl border border-pink-100 overflow-hidden mb-10">

//             {/* BANNER */}
//             <div className="relative">

//               <img
//                 src={store.banner}
//                 alt="banner"
//                 className="w-full h-72 object-cover"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

//             </div>

//             {/* STORE INFO */}
//             <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

//               <div className="flex flex-col sm:flex-row gap-6 sm:items-center">

//                 <img
//                   src={store.logo}
//                   alt="logo"
//                   className="w-36 h-36 rounded-full border-4 border-pink-100 object-cover shadow-xl"
//                 />

//                 <div>

//                   <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">

//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>

//                     Active Store

//                   </div>

//                   <h2 className="text-4xl font-black text-gray-800">

//                     {store.store_name}

//                   </h2>

//                   <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">

//                     {store.description}

//                   </p>

//                   <p className="text-gray-400 mt-3">

//                     📍 {store.address}

//                   </p>

//                 </div>

//               </div>

//               {/* BUTTON */}
//               <Link
//                 to="/edit-store"
//                 className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition duration-300 hover:scale-105"
//               >

//                 <Eye size={20} />

//                 Manage Store

//               </Link>

//             </div>

//           </div>

//         ) : (

//           <div className="bg-white rounded-[40px] p-14 text-center shadow-xl border border-pink-100 mb-10">

//             <div className="text-7xl mb-6">

//               🏪

//             </div>

//             <h2 className="text-5xl font-black text-gray-800 mb-5">

//               No Store Created

//             </h2>

//             <p className="text-gray-500 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">

//               Create your ecommerce store and start selling
//               products online with NovaMart marketplace.

//             </p>

//             <Link
//               to="/create-store"
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg transition duration-300 hover:scale-105"
//             >

//               <Store size={22} />

//               Create Store

//             </Link>

//           </div>

//         )}

//         {/* ================= ACTION CARDS ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

//           {dashboardItems.map((item, i) => (

//             <Link
//               key={i}
//               to={item.link}
//               className={`group bg-gradient-to-br ${item.color} rounded-[32px] p-8 text-white shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden`}
//             >

//               {/* GLOW */}
//               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

//               <div className="relative z-10">

//                 <div className="mb-8 group-hover:scale-110 transition duration-300">

//                   {item.icon}

//                 </div>

//                 <h3 className="text-2xl font-black">

//                   {item.title}

//                 </h3>

//                 <p className="text-white/80 text-sm mt-3 leading-relaxed">

//                   Manage your business operations easily

//                 </p>

//               </div>

//             </Link>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default VendorDashboard;


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
  Boxes,
  BadgeDollarSign,
  TrendingUp,
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
      .catch((err) => {

        console.log(err);

        setLoading(false);

        toast.error("Failed to load store");

      });

  }, []);

  const dashboardItems = [

 {
    title: "Create Store",
    icon: <Store size={28} />,
    link: "/create-store",
    color: "from-emerald-500 to-teal-500",
  },


    {
      title: "Add Product",
      icon: <PlusCircle size={28} />,
      link: "/add-product",
      color: "from-pink-500 to-rose-500",
    },

    {
      title: "My Products",
      icon: <Package size={28} />,
      link: "/vendor-products",
      color: "from-violet-500 to-purple-500",
    },

    {
      title: "Orders",
      icon: <ShoppingCart size={28} />,
      link: "/vendor-orders",
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Edit Store",
      icon: <Pencil size={28} />,
      link: "/edit-store",
      color: "from-orange-500 to-amber-500",
    },

  ];

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#fff7ed]">

        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#fdf2f8] py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* STORE CARD */}
          {store ? (

            <div className="lg:col-span-2 bg-white rounded-[36px] shadow-xl border border-pink-100 overflow-hidden">

              {/* BANNER */}
              <div className="relative">

                <img
                  src={store.banner}
                  alt="banner"
                  className="w-full h-64 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              </div>

              {/* STORE INFO */}
              <div className="p-8">

                <div className="flex flex-col md:flex-row md:items-center gap-6">

                  <img
                    src={store.logo}
                    alt="logo"
                    className="w-28 h-28 rounded-full border-4 border-pink-100 object-cover shadow-xl"
                  />

                  <div className="flex-1">

                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4 text-sm font-medium">

                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>

                      Active Store

                    </div>

                    <h2 className="text-4xl font-black text-gray-800">

                      {store.store_name}

                    </h2>

                    <p className="text-gray-500 mt-3 leading-relaxed">

                      {store.description}

                    </p>

                    <p className="text-gray-400 mt-3">

                      📍 {store.address}

                    </p>

                  </div>

                  <Link
                    to="/edit-store"
                    className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition duration-300 hover:scale-105"
                  >

                    <Eye size={20} />

                    Manage

                  </Link>

                </div>

              </div>

            </div>

          ) : (

            <div className="lg:col-span-2 bg-white rounded-[36px] p-12 shadow-xl border border-pink-100 text-center">

              <div className="text-7xl mb-6">

                🏪

              </div>

              <h2 className="text-4xl font-black text-gray-800 mb-4">

                Create Your Store

              </h2>

              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">

                Start selling products with your own premium online store.

              </p>

              <Link
                to="/create-store"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300"
              >

                <Store size={20} />

                Create Store

              </Link>

            </div>

          )}

          {/* STATS */}
          <div className="grid grid-cols-2 gap-5">

            {/* REVENUE */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100">

              <div className="h-14 w-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-5">

                <BadgeDollarSign
                  className="text-pink-500"
                  size={28}
                />

              </div>

              <p className="text-gray-500 text-sm font-medium">

                Revenue

              </p>

              <h2 className="text-3xl font-black mt-2 text-pink-600">

                ₹0

              </h2>

            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-violet-100">

              <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-5">

                <Boxes
                  className="text-violet-500"
                  size={28}
                />

              </div>

              <p className="text-gray-500 text-sm font-medium">

                Products

              </p>

              <h2 className="text-3xl font-black mt-2 text-violet-600">

                --

              </h2>

            </div>

            {/* ORDERS */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-100">

              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">

                <ShoppingCart
                  className="text-orange-500"
                  size={28}
                />

              </div>

              <p className="text-gray-500 text-sm font-medium">

                Orders

              </p>

              <h2 className="text-3xl font-black mt-2 text-orange-500">

                --

              </h2>

            </div>



             

              

          </div>

        </div>

        {/* ================= ACTION SECTION ================= */}
        <div>

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-3xl font-black text-gray-800">

                Quick Actions

              </h2>

              <p className="text-gray-500 mt-1">

                Manage your store easily

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {dashboardItems.map((item, i) => (

              <Link
                key={i}
                to={item.link}
                className={`group bg-gradient-to-br ${item.color} rounded-[32px] p-8 text-white shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden`}
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">

                  <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">

                    {item.icon}

                  </div>

                  <h3 className="text-2xl font-black">

                    {item.title}

                  </h3>

                  <p className="text-white/80 text-sm mt-3 leading-relaxed">

                    Manage your business operations

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