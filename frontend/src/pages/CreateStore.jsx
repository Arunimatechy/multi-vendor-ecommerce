// import { useState } from "react";

// import API from "../services/axios";

// import { useNavigate } from "react-router-dom";

// import {
//   Store,
//   FileText,
//   MapPin,
//   ImagePlus,
//   UploadCloud,
// } from "lucide-react";

// function CreateStore() {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     store_name: "",
//     description: "",
//     address: "",
//     logo: null,
//     banner: null,
//   });

//   // =========================
//   // HANDLE INPUT CHANGE
//   // =========================
//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // =========================
//   // HANDLE FILE CHANGE
//   // =========================
//   const handleFileChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.files[0],
//     });
//   };

//   // =========================
//   // SUBMIT FORM
//   // =========================
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     const data = new FormData();

//     data.append(
//       "store_name",
//       formData.store_name
//     );

//     data.append(
//       "description",
//       formData.description
//     );

//     data.append(
//       "address",
//       formData.address
//     );

//     data.append(
//       "logo",
//       formData.logo
//     );

//     data.append(
//       "banner",
//       formData.banner
//     );

//     try {

//       await API.post(
//         "vendors/create-store/",
//         data,
//         {
//           headers: {
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//       alert(
//         "Store Created Successfully"
//       );

//       navigate(
//         "/vendor-dashboard"
//       );

//     } catch (err) {

//       console.log(
//         err.response?.data ||
//         err.message
//       );

//       alert(
//         "Error creating store"
//       );
//     }
//   };

//   return (

//     <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 py-10 text-white">

//       <div className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">

//         {/* HEADER */}
//         <div className="bg-linear-to-r from-[#111827] to-[#1f2937] p-8 border-b border-white/10">

//           <div className="flex items-center gap-3">

//             <Store className="text-amber-400" />

//             <h1 className="text-3xl font-bold">

//               Create Your Store

//             </h1>

//           </div>

//           <p className="text-slate-400 mt-2">

//             Start selling your products online with your own brand

//           </p>

//         </div>

//         {/* FORM */}
//         <div className="p-8">

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//           >

//             {/* STORE NAME */}
//             <div>

//               <label className="flex items-center gap-2 text-slate-300 mb-2">

//                 <Store size={16} />

//                 Store Name

//               </label>

//               <input
//                 type="text"
//                 name="store_name"
//                 placeholder="Enter store name"
//                 onChange={handleChange}
//                 value={formData.store_name}
//                 className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//                 required
//               />

//             </div>

//             {/* DESCRIPTION */}
//             <div>

//               <label className="flex items-center gap-2 text-slate-300 mb-2">

//                 <FileText size={16} />

//                 Description

//               </label>

//               <textarea
//                 name="description"
//                 placeholder="Describe your store"
//                 rows="4"
//                 onChange={handleChange}
//                 value={formData.description}
//                 className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//                 required
//               />

//             </div>

//             {/* ADDRESS */}
//             <div>

//               <label className="flex items-center gap-2 text-slate-300 mb-2">

//                 <MapPin size={16} />

//                 Address

//               </label>

//               <textarea
//                 name="address"
//                 placeholder="Enter store address"
//                 rows="4"
//                 onChange={handleChange}
//                 value={formData.address}
//                 className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//                 required
//               />

//             </div>

//             {/* LOGO */}
//             <div>

//               <label className="flex items-center gap-2 text-slate-300 mb-2">

//                 <ImagePlus size={16} />

//                 Store Logo

//               </label>

//               <div className="relative">

//                 <UploadCloud
//                   className="absolute left-3 top-3 text-slate-400"
//                   size={18}
//                 />

//                 <input
//                   type="file"
//                   name="logo"
//                   onChange={handleFileChange}
//                   className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 py-3"
//                   required
//                 />

//               </div>

//             </div>

//             {/* BANNER */}
//             <div>

//               <label className="flex items-center gap-2 text-slate-300 mb-2">

//                 <ImagePlus size={16} />

//                 Store Banner

//               </label>

//               <div className="relative">

//                 <UploadCloud
//                   className="absolute left-3 top-3 text-slate-400"
//                   size={18}
//                 />

//                 <input
//                   type="file"
//                   name="banner"
//                   onChange={handleFileChange}
//                   className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 py-3"
//                   required
//                 />

//               </div>

//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 rounded-xl transition"
//             >

//               Create Store

//             </button>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default CreateStore;

import { useState } from "react";

import API from "../services/axios";

import { useNavigate } from "react-router-dom";

import {
  Store,
  FileText,
  MapPin,
  ImagePlus,
  UploadCloud,
  Sparkles,
} from "lucide-react";

function CreateStore() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    store_name: "",
    description: "",
    address: "",
    logo: null,
    banner: null,
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE FILE CHANGE
  // =========================

  const handleFileChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append(
      "store_name",
      formData.store_name
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "address",
      formData.address
    );

    data.append(
      "logo",
      formData.logo
    );

    data.append(
      "banner",
      formData.banner
    );

    try {

      await API.post(
        "vendors/create-store/",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Store Created Successfully"
      );

      navigate(
        "/vendor-dashboard"
      );

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

      alert(
        "Error creating store"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 p-10 text-white shadow-2xl mb-10">

          <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">

              <Store size={40} />

            </div>

            <div>

              <h1 className="text-5xl font-extrabold">
                Create Your Store
              </h1>

              <p className="mt-3 text-lg text-white/90 max-w-2xl">
                Launch your premium Luxora marketplace store and start selling products beautifully.
              </p>

            </div>

          </div>

        </div>

        {/* FORM CARD */}

        <div className="bg-white border border-pink-100 rounded-[36px] shadow-2xl overflow-hidden">

          {/* TOP BAR */}

          <div className="bg-gradient-to-r from-pink-500 to-orange-400 px-8 py-6 text-white">

            <div className="flex items-center gap-3">

              <Sparkles size={24} />

              <h2 className="text-2xl font-bold">
                Store Information
              </h2>

            </div>

            <p className="text-white/90 mt-2">
              Fill all details carefully to create your vendor storefront
            </p>

          </div>

          {/* FORM */}

          <div className="p-8 md:p-10">

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* STORE NAME */}

              <div>

                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">

                  <Store size={18} className="text-pink-500" />

                  Store Name

                </label>

                <input
                  type="text"
                  name="store_name"
                  placeholder="Enter your store name"
                  onChange={handleChange}
                  value={formData.store_name}
                  className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-400 transition"
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">

                  <FileText size={18} className="text-pink-500" />

                  Store Description

                </label>

                <textarea
                  name="description"
                  placeholder="Describe your store and products"
                  rows="5"
                  onChange={handleChange}
                  value={formData.description}
                  className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-400 transition resize-none"
                  required
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">

                  <MapPin size={18} className="text-pink-500" />

                  Store Address

                </label>

                <textarea
                  name="address"
                  placeholder="Enter store address"
                  rows="4"
                  onChange={handleChange}
                  value={formData.address}
                  className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-400 transition resize-none"
                  required
                />

              </div>

              {/* FILE UPLOADS */}

              <div className="grid md:grid-cols-2 gap-6">

                {/* LOGO */}

                <div className="bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 rounded-3xl p-6">

                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-4">

                    <ImagePlus
                      size={18}
                      className="text-pink-500"
                    />

                    Store Logo

                  </label>

                  <div className="border-2 border-dashed border-pink-200 rounded-2xl p-6 text-center bg-white">

                    <UploadCloud
                      className="mx-auto text-pink-500 mb-3"
                      size={34}
                    />

                    <p className="text-gray-500 text-sm mb-4">
                      Upload your brand logo
                    </p>

                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-600"
                      required
                    />

                  </div>

                </div>

                {/* BANNER */}

                <div className="bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 rounded-3xl p-6">

                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-4">

                    <ImagePlus
                      size={18}
                      className="text-pink-500"
                    />

                    Store Banner

                  </label>

                  <div className="border-2 border-dashed border-pink-200 rounded-2xl p-6 text-center bg-white">

                    <UploadCloud
                      className="mx-auto text-orange-400 mb-3"
                      size={34}
                    />

                    <p className="text-gray-500 text-sm mb-4">
                      Upload your storefront banner
                    </p>

                    <input
                      type="file"
                      name="banner"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-600"
                      required
                    />

                  </div>

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 hover:opacity-90 text-white font-bold py-4 rounded-2xl text-lg shadow-xl transition duration-300"
              >

                Create Store

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateStore;