

// import { useEffect, useState } from "react";
// import API from "../services/axios";
// import { useNavigate } from "react-router-dom";

// function EditStore() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     store_name: "",
//     description: "",
//     address: "",
//     logo: null,
//     banner: null,
//     logo_url: "",
//     banner_url: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchStore = async () => {
//       try {
//         const res = await API.get("vendors/my-store/");

//         setFormData({
//           store_name: res.data.store_name || "",
//           description: res.data.description || "",
//           address: res.data.address || "",
//           logo: null,
//           banner: null,
//           logo_url: res.data.logo,
//           banner_url: res.data.banner,
//         });
//       } catch (err) {
//         console.log(err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStore();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const data = new FormData();
//     data.append("store_name", formData.store_name);
//     data.append("description", formData.description);
//     data.append("address", formData.address);

//     if (formData.logo) data.append("logo", formData.logo);
//     if (formData.banner) data.append("banner", formData.banner);

//     try {
//       await API.put("vendors/update-store/", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Store Updated Successfully");
//       navigate("/vendor-dashboard");
//     } catch (err) {
//       console.log(err.response?.data || err.message);
//       alert("Update Failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0b0f19]">
//         <div className="h-12 w-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0b0f19] py-12 px-4 text-white">
//       <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">

//         {/* HEADER */}
//         <div className="px-8 py-6 border-b border-white/10">
//           <h1 className="text-3xl font-bold tracking-wide">
//             Edit Store
//           </h1>
//           <p className="text-slate-400 mt-1 text-sm">
//             Update your store details and branding
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="p-8 space-y-6">

//           <div>
//             <label className="text-sm text-slate-300">Store Name</label>
//             <input
//               name="store_name"
//               value={formData.store_name}
//               onChange={handleChange}
//               placeholder="Store Name"
//               className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-slate-300">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Store Description"
//               className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-slate-300">Address</label>
//             <input
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Store Address"
//               className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
//             />
//           </div>

//           {/* CURRENT LOGO */}
//           {formData.logo_url && (
//             <div>
//               <p className="text-sm text-slate-400 mb-2">Current Logo</p>
//               <img
//                 src={formData.logo_url}
//                 className="w-20 h-20 rounded-full object-cover border border-white/10"
//               />
//             </div>
//           )}

//           {/* CURRENT BANNER */}
//           {formData.banner_url && (
//             <div>
//               <p className="text-sm text-slate-400 mb-2">Current Banner</p>
//               <img
//                 src={formData.banner_url}
//                 className="w-full h-40 object-cover rounded-xl border border-white/10"
//               />
//             </div>
//           )}

//           <div>
//             <label className="text-sm text-slate-300">Change Logo</label>
//             <input
//               type="file"
//               name="logo"
//               onChange={handleFileChange}
//               className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-slate-300">Change Banner</label>
//             <input
//               type="file"
//               name="banner"
//               onChange={handleFileChange}
//               className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
//             />
//           </div>

//           <button
//             disabled={submitting}
//             className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 transition"
//           >
//             {submitting ? "Updating..." : "Update Store"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditStore;

import { useEffect, useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";

import {
  Store,
  FileText,
  MapPin,
  ImagePlus,
  Upload,
  Save,
  Sparkles,
} from "lucide-react";

function EditStore() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    store_name: "",
    description: "",
    address: "",
    logo: null,
    banner: null,
    logo_url: "",
    banner_url: "",
  });

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  // ================= FETCH STORE =================

  useEffect(() => {

    const fetchStore = async () => {

      try {

        const res = await API.get(
          "vendors/my-store/"
        );

        setFormData({
          store_name:
            res.data.store_name || "",
          description:
            res.data.description || "",
          address:
            res.data.address || "",
          logo: null,
          banner: null,
          logo_url: res.data.logo,
          banner_url: res.data.banner,
        });

      } catch (err) {

        console.log(
          err.response?.data ||
          err.message
        );

      } finally {

        setLoading(false);

      }
    };

    fetchStore();

  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // ================= HANDLE FILE =================

  const handleFileChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.files[0],
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);

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

    if (formData.logo) {

      data.append(
        "logo",
        formData.logo
      );
    }

    if (formData.banner) {

      data.append(
        "banner",
        formData.banner
      );
    }

    try {

      await API.put(
        "vendors/update-store/",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Store Updated Successfully"
      );

      navigate(
        "/vendor-dashboard"
      );

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

      alert("Update Failed");

    } finally {

      setSubmitting(false);

    }
  };

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#fff7ed] via-[#ffffff] to-[#fef3c7]">

        <div className="h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-linear-to-br from-[#fff7ed] via-[#ffffff] to-[#fef3c7] py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* MAIN CARD */}

        <div className="bg-white/90 backdrop-blur-xl border border-orange-100 rounded-4xl overflow-hidden shadow-2xl">

          {/* HEADER */}

          <div className="relative overflow-hidden bg-linear-to-r from-orange-500 via-amber-500 to-yellow-400 p-8 text-white">

            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex items-center gap-5">

              <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">

                <Store size={30} />

              </div>

              <div>

                <h1 className="text-4xl font-extrabold">

                  Edit Store

                </h1>

                <p className="text-white/90 mt-1">

                  Update your store details and branding

                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-7"
          >

            {/* STORE NAME */}

            <Input
              icon={<Store size={18} />}
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              placeholder="Store Name"
            />

            {/* DESCRIPTION */}

            <div>

              <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">

                <FileText size={18} />

                Store Description

              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your store..."
                className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
              />

            </div>

            {/* ADDRESS */}

            <div>

              <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">

                <MapPin size={18} />

                Store Address

              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter store address..."
                className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
              />

            </div>

            {/* CURRENT IMAGES */}

            <div className="grid md:grid-cols-2 gap-6">

              {/* LOGO */}

              {formData.logo_url && (

                <div>

                  <p className="text-gray-700 font-semibold mb-3">

                    Current Logo

                  </p>

                  <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex items-center justify-center shadow-lg">

                    <img
                      src={formData.logo_url}
                      alt="Store Logo"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                    />

                  </div>

                </div>

              )}

              {/* BANNER */}

              {formData.banner_url && (

                <div>

                  <p className="text-gray-700 font-semibold mb-3">

                    Current Banner

                  </p>

                  <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-lg">

                    <img
                      src={formData.banner_url}
                      alt="Store Banner"
                      className="w-full h-52 object-cover"
                    />

                  </div>

                </div>

              )}

            </div>

            {/* FILE UPLOADS */}

            <div className="grid md:grid-cols-2 gap-6">

              {/* CHANGE LOGO */}

              <label className="border-2 border-dashed border-orange-200 bg-orange-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-400 transition">

                <ImagePlus
                  size={38}
                  className="text-orange-500 mb-4"
                />

                <h3 className="font-bold text-gray-800">

                  Change Logo

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  Upload a new store logo
                </p>

                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

              {/* CHANGE BANNER */}

              <label className="border-2 border-dashed border-orange-200 bg-orange-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-400 transition">

                <Upload
                  size={38}
                  className="text-orange-500 mb-4"
                />

                <h3 className="font-bold text-gray-800">

                  Change Banner

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  Upload a new banner image
                </p>

                <input
                  type="file"
                  name="banner"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            </div>

            {/* BRAND CARD */}

            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-5 flex items-center gap-4">

              <div className="h-14 w-14 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg">

                <Sparkles size={24} />

              </div>

              <div>

                <h3 className="font-bold text-gray-800 text-lg">

                  Build Your Brand

                </h3>

                <p className="text-gray-500 text-sm">

                  Keep your store updated to attract more customers.

                </p>

              </div>

            </div>

            {/* BUTTON */}

            <button
              disabled={submitting}
              className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:scale-[1.01] hover:shadow-2xl text-white font-bold py-4 rounded-2xl transition duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
            >

              <Save size={20} />

              {submitting
                ? "Updating..."
                : "Update Store"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

// ================= INPUT =================

function Input({ icon, ...props }) {

  return (

    <div className="relative">

      <div className="absolute left-4 top-4 text-orange-500">

        {icon}

      </div>

      <input
        {...props}
        className="w-full bg-orange-50 border border-orange-100 rounded-2xl pl-12 p-4 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
      />

    </div>
  );
}

export default EditStore;