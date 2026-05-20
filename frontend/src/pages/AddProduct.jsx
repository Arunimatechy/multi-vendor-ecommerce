



import { useState } from "react";

import API from "../services/axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Package,
  ImagePlus,
  Tag,
  IndianRupee,
  Boxes,
  Sparkles,
  FileText,
  Layers,
} from "lucide-react";

function AddProduct() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file) {

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);

    data.append("slug", formData.slug);

    data.append("category", formData.category);

    data.append(
      "description",
      formData.description
    );

    data.append("price", formData.price);

    data.append(
      "discount_price",
      formData.discount_price
    );

    data.append("stock", formData.stock);

    data.append(
      "featured",
      formData.featured
    );

    data.append("image", formData.image);

    try {

      await API.post(
        "products/add/",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Product Added Successfully 🎉"
      );

      navigate("/vendor-products");

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

      toast.error(
        "Failed to add product ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-linear-to-br from-[#fdf2f8] via-white to-[#fff7ed] py-10 px-4 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-[40px] overflow-hidden shadow-2xl">

        {/* ================= HEADER ================= */}
        <div className="bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 p-10 text-white relative overflow-hidden">

          <div className="absolute -top-20 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center gap-5">

            <div className="h-20 w-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center">

              <Package size={40} />

            </div>

            <div>

              <h1 className="text-5xl font-black">

                Add Product

              </h1>

              <p className="mt-3 text-white/90 text-lg">

                Create and publish your
                premium marketplace product.

              </p>

            </div>

          </div>

        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="p-8 md:p-10"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PRODUCT NAME */}
            <div>

              <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

                <Package size={18} />

                Product Name

              </label>

              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />

            </div>

            {/* SLUG */}
            <div>

              <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

                <Tag size={18} />

                Product Slug

              </label>

              <input
                type="text"
                name="slug"
                onChange={handleChange}
                placeholder="product-slug"
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />

            </div>

            {/* CATEGORY */}
            <div>

              <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

                <Layers size={18} />

                Category

              </label>

              <select
                name="category"
                onChange={handleChange}
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
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

            </div>

            {/* STOCK */}
            <div>

              <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

                <Boxes size={18} />

                Stock Quantity

              </label>

              <input
                type="number"
                name="stock"
                onChange={handleChange}
                placeholder="Available stock"
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />

            </div>

            {/* PRICE */}
            <div>

              <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

                <IndianRupee size={18} />

                Price

              </label>

              <input
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Product price"
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />

            </div>

            {/* DISCOUNT PRICE */}
            <div>

              <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

                <Sparkles size={18} />

                Discount Price

              </label>

              <input
                type="number"
                name="discount_price"
                onChange={handleChange}
                placeholder="Discount price"
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">

            <label className="text-gray-600 font-semibold mb-2 flex items-center gap-2">

              <FileText size={18} />

              Product Description

            </label>

            <textarea
              name="description"
              rows="5"
              onChange={handleChange}
              placeholder="Write product description..."
              className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
            />

          </div>

          {/* FEATURED */}
          <div className="mt-6">

            <label className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 cursor-pointer">

              <input
                type="checkbox"
                name="featured"
                onChange={handleChange}
                className="h-5 w-5 accent-pink-500"
              />

              <span className="font-semibold text-gray-700">

                Featured Product

              </span>

            </label>

          </div>

          {/* IMAGE */}
          <div className="mt-6">

            <label className="text-gray-600 font-semibold mb-3 flex items-center gap-2">

              <ImagePlus size={18} />

              Product Image

            </label>

            <div className="border-2 border-dashed border-pink-200 rounded-3xl p-6 bg-pink-50">

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />

              {
                preview && (

                  <div className="mt-6 flex justify-center">

                    <img
                      src={preview}
                      alt="preview"
                      className="w-60 h-60 object-cover rounded-3xl shadow-xl border border-pink-100"
                    />

                  </div>
                )
              }

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
          >

            {
              loading
                ? "Adding Product..."
                : "Add Product"
            }

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;
