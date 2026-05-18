// import { useEffect, useState } from "react";
// import API from "../services/axios";

// function StoreProfile() {

//   const [store, setStore] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     API.get("vendors/my-store/")

//       .then((res) => {
//         setStore(res.data);
//       })

//       .catch((err) => {
//         console.log(err);
//       })

//       .finally(() => {
//         setLoading(false);
//       });

//   }, []);

//   // Loading
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
//         <div className="h-14 w-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // No Store
//   if (!store) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] px-4">

//         <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 text-center max-w-md w-full text-white">

//           <h2 className="text-3xl font-bold tracking-tight">
//             No Store Found
//           </h2>

//           <p className="text-slate-400 mt-3">
//             Create your store to start selling products.
//           </p>

//         </div>

//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-b from-[#0a0f1c] via-[#0f172a] to-[#0a0f1c] py-10 px-4 text-white">

//       <div className="max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">

//         {/* Banner */}
//         <div className="relative">

//           <img
//             src={store.banner || "https://via.placeholder.com/1200x350"}
//             alt={store.name}
//             className="w-full h-72 object-cover"
//           />

//           <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

//         </div>

//         {/* Content */}
//         <div className="px-8 pb-10">

//           {/* Logo */}
//           <div className="-mt-16 mb-6">

//             <img
//               src={store.logo || "https://via.placeholder.com/150"}
//               alt={store.name}
//               className="w-32 h-32 rounded-full border-4 border-[#0a0f1c] shadow-xl object-cover bg-[#111827]"
//             />

//           </div>

//           {/* Store Name */}
//           <h1 className="text-4xl font-bold tracking-tight">
//             {store.name}
//           </h1>

//           {/* Description */}
//           <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mt-3">
//             {store.description}
//           </p>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">

//               <h3 className="text-sm text-slate-400">
//                 Store Status
//               </h3>

//               <p className="text-amber-400 font-semibold text-xl mt-2">
//                 Active
//               </p>

//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">

//               <h3 className="text-sm text-slate-400">
//                 Products
//               </h3>

//               <p className="text-amber-300 font-semibold text-xl mt-2">
//                 Available
//               </p>

//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">

//               <h3 className="text-sm text-slate-400">
//                 Vendor Panel
//               </h3>

//               <p className="text-slate-200 font-semibold text-xl mt-2">
//                 Enabled
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default StoreProfile;

import { useEffect, useState } from "react";
import API from "../services/axios";

import {
  Store,
  BadgeCheck,
  Package,
  ShieldCheck,
  Sparkles,
  MapPin,
} from "lucide-react";

function StoreProfile() {

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    API.get("vendors/my-store/")

      .then((res) => {
        setStore(res.data);
      })

      .catch((err) => {
        console.log(err);
      })

      .finally(() => {
        setLoading(false);
      });

  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 via-white to-orange-50">
        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ================= NO STORE =================
  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 via-white to-orange-50 px-4">

        <div className="bg-white border border-pink-100 shadow-2xl rounded-4xl p-10 text-center max-w-md w-full">

          <div className="w-20 h-20 rounded-3xl bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-6 shadow-lg">

            <Store className="text-white" size={34} />

          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            No Store Found
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Create your beautiful store and start selling products online.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-orange-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* MAIN CARD */}
        <div className="bg-white border border-pink-100 shadow-2xl rounded-[36px] overflow-hidden">

          {/* ================= BANNER ================= */}
          <div className="relative">

            <img
              src={
                store.banner ||
                "https://via.placeholder.com/1200x350"
              }
              alt={store.store_name}
              className="w-full h-80 object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* BADGE */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full flex items-center gap-2 text-white font-medium">

              <Sparkles size={16} />

              Premium Vendor

            </div>

          </div>

          {/* ================= CONTENT ================= */}
          <div className="px-8 md:px-12 pb-12">

            {/* LOGO */}
            <div className="-mt-20 relative z-10">

              <div className="w-40 h-40 rounded-full bg-white p-2 shadow-2xl border-4 border-white overflow-hidden">

                <img
                  src={
                    store.logo ||
                    "https://via.placeholder.com/150"
                  }
                  alt={store.store_name}
                  className="w-full h-full object-cover rounded-full"
                />

              </div>

            </div>

            {/* STORE INFO */}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">

                    {store.store_name}

                  </h1>

                  <div className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">

                    <BadgeCheck size={16} />

                    Verified

                  </div>

                </div>

                <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed text-lg">

                  {store.description}

                </p>

                {/* ADDRESS */}
                <div className="flex items-center gap-2 mt-5 text-gray-600">

                  <MapPin size={18} className="text-pink-500" />

                  {store.address}

                </div>

              </div>

            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

              {/* STATUS */}
              <div className="bg-linear-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-3xl p-6 hover:shadow-xl transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center shadow-lg">

                  <ShieldCheck className="text-white" />

                </div>

                <h3 className="text-gray-500 text-sm mt-5">
                  Store Status
                </h3>

                <p className="text-2xl font-bold text-gray-800 mt-2">
                  Active
                </p>

              </div>

              {/* PRODUCTS */}
              <div className="bg-linear-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-6 hover:shadow-xl transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-orange-400 flex items-center justify-center shadow-lg">

                  <Package className="text-white" />

                </div>

                <h3 className="text-gray-500 text-sm mt-5">
                  Product Access
                </h3>

                <p className="text-2xl font-bold text-gray-800 mt-2">
                  Enabled
                </p>

              </div>

              {/* VENDOR */}
              <div className="bg-linear-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-3xl p-6 hover:shadow-xl transition duration-300">

                <div className="w-14 h-14 rounded-2xl bg-violet-500 flex items-center justify-center shadow-lg">

                  <Store className="text-white" />

                </div>

                <h3 className="text-gray-500 text-sm mt-5">
                  Vendor Panel
                </h3>

                <p className="text-2xl font-bold text-gray-800 mt-2">
                  Premium
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StoreProfile;