



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
  X,
  Image,
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

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await API.get("vendors/my-store/");

        setFormData({
          store_name: res.data.store_name || "",
          description: res.data.description || "",
          address: res.data.address || "",
          logo: null,
          banner: null,
          logo_url: res.data.logo,
          banner_url: res.data.banner,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [name + "_url"]: URL.createObjectURL(file),
    }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    setFormData((prev) => ({
      ...prev,
      [type]: file,
      [type + "_url"]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("store_name", formData.store_name);
    data.append("description", formData.description);
    data.append("address", formData.address);

    if (formData.logo) data.append("logo", formData.logo);
    if (formData.banner) data.append("banner", formData.banner);

    try {
      await API.put("vendors/update-store/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Store Updated Successfully");
      navigate("/vendor-dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="h-14 w-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-2xl overflow-hidden">

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white">
              <div className="flex items-center gap-4">
                <Store size={34} />
                <div>
                  <h1 className="text-3xl font-black">Edit Store</h1>
                  <p className="text-white/80">Update your brand identity</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">

              <Input icon={<Store />} name="store_name" value={formData.store_name} onChange={handleChange} placeholder="Store Name" />

              <Textarea icon={<FileText />} name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

              <Textarea icon={<MapPin />} name="address" value={formData.address} onChange={handleChange} placeholder="Address" />

              <div className="grid md:grid-cols-2 gap-4">

                <UploadBox
                  title="Logo"
                  preview={formData.logo_url}
                  onDrop={(e) => handleDrop(e, "logo")}
                  onChange={handleFileChange}
                  name="logo"
                />

                <UploadBox
                  title="Banner"
                  preview={formData.banner_url}
                  onDrop={(e) => handleDrop(e, "banner")}
                  onChange={handleFileChange}
                  name="banner"
                />

              </div>

              <button
                disabled={submitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition"
              >
                <Save />
                {submitting ? "Updating..." : "Update Store"}
              </button>

            </form>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="lg:sticky top-24 h-fit space-y-6">

          <div className="bg-white border border-orange-100 rounded-3xl shadow-xl overflow-hidden">

            <div className="h-40 bg-orange-100 overflow-hidden">
              {formData.banner_url ? (
                <img src={formData.banner_url} className="w-full h-full object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Banner
                </div>
              )}
            </div>

            <div className="p-6 text-center">

              <div className="w-24 h-24 mx-auto -mt-12 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-lg">
                {formData.logo_url ? (
                  <img src={formData.logo_url} className="w-full h-full object-cover" />
                ) : (
                  <Image className="w-full h-full text-gray-300 p-4" />
                )}
              </div>

              <h2 className="text-xl font-bold mt-4">
                {formData.store_name || "Your Store"}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                {formData.description || "Store description preview"}
              </p>

              <div className="mt-4 text-xs text-gray-400">
                Live Preview Panel
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* INPUT */
function Input(props) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 text-orange-500">
        {props.icon}
      </div>
      <input
        {...props}
        className="w-full bg-orange-50 border border-orange-100 rounded-2xl pl-12 p-4 outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

/* TEXTAREA */
function Textarea(props) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 text-orange-500">
        {props.icon}
      </div>
      <textarea
        {...props}
        className="w-full bg-orange-50 border border-orange-100 rounded-2xl pl-12 p-4 outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

/* UPLOAD BOX */
function UploadBox({ title, preview, onDrop, onChange, name }) {
  return (
    <label
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="border-2 border-dashed border-orange-200 bg-orange-50 rounded-3xl p-6 text-center cursor-pointer hover:border-orange-400 transition"
    >
      {preview ? (
        <img src={preview} className="h-28 mx-auto object-cover rounded-xl" />
      ) : (
        <>
          <Upload className="mx-auto text-orange-500 mb-2" />
          <p className="font-bold">{title}</p>
          <p className="text-xs text-gray-500">Drag & Drop or Click</p>
        </>
      )}

      <input type="file" name={name} onChange={onChange} className="hidden" />
    </label>
  );
}

export default EditStore;