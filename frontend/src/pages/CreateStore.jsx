




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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("store_name", formData.store_name);
    data.append("description", formData.description);
    data.append("address", formData.address);
    data.append("logo", formData.logo);
    data.append("banner", formData.banner);

    try {
      await API.post("vendors/create-store/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Store Created Successfully");
      navigate("/vendor-dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error creating store");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-12 px-4">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 p-10 text-white shadow-2xl">

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/20 blur-3xl rounded-full" />

          <div className="relative flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Store size={34} />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold">
                Create Your Store
              </h1>
              <p className="mt-2 text-white/90 text-base md:text-lg">
                Launch your marketplace store and start selling instantly.
              </p>
            </div>

          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-[32px] shadow-xl border border-pink-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-400 px-8 py-5 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <h2 className="text-xl md:text-2xl font-bold">
                Store Setup
              </h2>
            </div>
            <p className="text-white/90 text-sm mt-1">
              Fill in your store details
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-8 space-y-7">

            {/* STORE NAME */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Store size={16} className="text-pink-500" />
                Store Name
              </label>

              <input
                type="text"
                name="store_name"
                placeholder="Enter store name"
                onChange={handleChange}
                value={formData.store_name}
                className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FileText size={16} className="text-pink-500" />
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                placeholder="Describe your store"
                onChange={handleChange}
                value={formData.description}
                className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                required
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <MapPin size={16} className="text-pink-500" />
                Address
              </label>

              <textarea
                name="address"
                rows="3"
                placeholder="Store address"
                onChange={handleChange}
                value={formData.address}
                className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                required
              />
            </div>

            {/* FILE UPLOADS */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* LOGO */}
              <div className="border border-pink-100 rounded-2xl p-5 bg-pink-50/40">
                <label className="flex items-center gap-2 font-semibold mb-3">
                  <ImagePlus size={16} className="text-pink-500" />
                  Logo
                </label>

                <div className="border border-dashed border-pink-200 rounded-xl p-5 text-center bg-white">
                  <UploadCloud className="mx-auto text-pink-500 mb-2" />
                  <input type="file" name="logo" onChange={handleFileChange} />
                </div>
              </div>

              {/* BANNER */}
              <div className="border border-pink-100 rounded-2xl p-5 bg-pink-50/40">
                <label className="flex items-center gap-2 font-semibold mb-3">
                  <ImagePlus size={16} className="text-orange-400" />
                  Banner
                </label>

                <div className="border border-dashed border-pink-200 rounded-xl p-5 text-center bg-white">
                  <UploadCloud className="mx-auto text-orange-400 mb-2" />
                  <input type="file" name="banner" onChange={handleFileChange} />
                </div>
              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Create Store
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default CreateStore;