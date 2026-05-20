


import { useEffect, useState } from "react";
import API from "../services/axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  Package,
  Tag,
  IndianRupee,
  Boxes,
  Star,
  ImagePlus,
  Save,
  Sparkles,
} from "lucide-react";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [existingImage, setExistingImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    discount_price: "",
    stock: "",
    featured: false,
    image: null,
  });

  useEffect(() => {

    API.get(`products/${id}/`)
      .then((res) => {

        setFormData({
          name: res.data.name || "",
          slug: res.data.slug || "",
          category: res.data.category || "",
          description: res.data.description || "",
          price: res.data.price || "",
          discount_price: res.data.discount_price || "",
          stock: res.data.stock || "",
          featured: res.data.featured || false,
          image: null,
        });

        setExistingImage(res.data.image || null);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        setLoading(false);
      });

  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discount_price", formData.discount_price);
    data.append("stock", formData.stock);
    data.append("featured", formData.featured);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await API.put(`products/edit/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully");
      navigate("/vendor-products");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="h-14 w-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 p-8 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Package size={30} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-white/90 text-sm">
                  Update product information easily
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            <Input icon={<Package size={18} />} name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />

            <Input icon={<Tag size={18} />} name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" />

            {/* CATEGORY */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Category</option>
                <option value="spices">Spices</option>
                <option value="fashion">Fashion</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="bakery">Bakery</option>
                <option value="beauty">Beauty</option>
                <option value="home">Home Essentials</option>
                <option value="stationery">Stationery</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Product description..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-400"
            />

            {/* GRID */}
            <div className="grid md:grid-cols-3 gap-4">

              <Input icon={<IndianRupee size={18} />} name="price" value={formData.price} onChange={handleChange} placeholder="Price" />

              <Input icon={<Star size={18} />} name="discount_price" value={formData.discount_price} onChange={handleChange} placeholder="Discount" />

              <Input icon={<Boxes size={18} />} name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />

            </div>

            {/* FEATURED */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Sparkles className="text-orange-500" />
                <div>
                  <h3 className="font-semibold">Featured Product</h3>
                  <p className="text-sm text-gray-500">Show on homepage</p>
                </div>
              </div>

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
            </div>

            {/* IMAGE */}
            <div className="grid md:grid-cols-2 gap-6">

              {existingImage && (
                <div>
                  <p className="text-sm font-semibold mb-2">Current Image</p>
                  <img
                    src={existingImage}
                    className="rounded-2xl h-56 w-full object-cover border"
                  />
                </div>
              )}

              <label className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <ImagePlus className="text-orange-500 mb-2" size={40} />
                <p className="font-semibold">Upload New Image</p>
                <p className="text-sm text-gray-500">PNG, JPG supported</p>

                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>

            </div>

            {/* BUTTON */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.01] transition">
              <Save size={18} />
              Update Product
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 text-orange-500">
        {icon}
      </div>

      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 p-4 focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

export default EditProduct;

