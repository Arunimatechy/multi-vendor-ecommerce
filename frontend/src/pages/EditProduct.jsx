






// import { useEffect, useState } from "react";
// import API from "../services/axios";
// import { useParams, useNavigate } from "react-router-dom";

// import {
//   Package,
//   Tag,
//   FileText,
//   IndianRupee,
//   Boxes,
//   Star,
//   ImagePlus,
// } from "lucide-react";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [existingImage, setExistingImage] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     category: "",
//     description: "",
//     price: "",
//     discount_price: "",
//     stock: "",
//     featured: false,
//     image: null,
//   });

//   useEffect(() => {
//     API.get(`products/${id}/`)
//       .then((res) => {
//         setFormData({
//           name: res.data.name || "",
//           slug: res.data.slug || "",
//           category: res.data.category || "",
//           description: res.data.description || "",
//           price: res.data.price || "",
//           discount_price: res.data.discount_price || "",
//           stock: res.data.stock || "",
//           featured: res.data.featured || false,
//           image: null,
//         });

//         setExistingImage(res.data.image || null);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err.response?.data || err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       image: e.target.files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     data.append("name", formData.name);
//     data.append("slug", formData.slug);
//     data.append("category", formData.category);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("discount_price", formData.discount_price);
//     data.append("stock", formData.stock);
//     data.append("featured", formData.featured);

//     if (formData.image) {
//       data.append("image", formData.image);
//     }

//     try {
//       await API.put(`products/edit/${id}/`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Product updated successfully");
//       navigate("/vendor-products");
//     } catch (err) {
//       console.log(err.response?.data || err.message);
//       alert("Update failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0b0f19]">
//         <div className="h-14 w-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0b0f19] text-white py-10 px-4">
//       <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">

//         {/* HEADER */}
//         <div className="p-8 border-b border-white/10 bg-linear-to-r from-[#111827] to-[#1f2937]">
//           <div className="flex items-center gap-3">
//             <Package className="text-amber-400" />
//             <h1 className="text-3xl font-bold">Edit Product</h1>
//           </div>
//           <p className="text-slate-400 mt-2">
//             Update your product details
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="p-8 space-y-5">

//           {/* NAME */}
//           <Input icon={<Package size={16} />} name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />

//           {/* SLUG */}
//           <Input icon={<Tag size={16} />} name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" />

//           {/* CATEGORY */}
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full bg-[#111827] border border-white/10 rounded-xl p-3"
//           >
//            <option value="">Select Category</option>

// <option value="spices">Spices</option>

// <option value="fashion">Fashion</option>

// <option value="vegetables">Vegetables</option>

// <option value="fruits">Fruits</option>

// <option value="bakery">Bakery</option>

// <option value="beauty">Beauty & Personal Care</option>

// <option value="home">Home Essentials</option>

// <option value="stationery">Stationery</option>
//           </select>

//           {/* DESCRIPTION */}
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full bg-[#111827] border border-white/10 rounded-xl p-3"
//           />

//           {/* PRICE */}
//           <Input icon={<IndianRupee size={16} />} name="price" value={formData.price} onChange={handleChange} placeholder="Price" />

//           {/* DISCOUNT */}
//           <Input icon={<Star size={16} />} name="discount_price" value={formData.discount_price} onChange={handleChange} placeholder="Discount Price" />

//           {/* STOCK */}
//           <Input icon={<Boxes size={16} />} name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />

//           {/* FEATURED */}
//           <label className="flex items-center gap-2 text-slate-300">
//             <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
//             Featured Product
//           </label>

//           {/* CURRENT IMAGE */}
//           {existingImage && (
//             <div>
//               <p className="text-slate-300 mb-2">Current Image</p>
//               <img
//                 src={existingImage}
//                 className="w-40 h-40 object-cover rounded-xl border border-white/10"
//               />
//             </div>
//           )}

//           {/* NEW IMAGE */}
//           <div className="relative">
//             <ImagePlus className="absolute left-3 top-3 text-slate-400" size={18} />
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 p-3"
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 rounded-xl transition"
//           >
//             Update Product
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* INPUT COMPONENT */
// function Input({ icon, ...props }) {
//   return (
//     <div className="relative">
//       <div className="absolute left-3 top-3 text-slate-400">
//         {icon}
//       </div>
//       <input
//         {...props}
//         className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
//       />
//     </div>
//   );
// }

// export default EditProduct;
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

  // ================= CHANGE =================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value,
    }));
  };

  // ================= FILE =================

  const handleFileChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append(
      "discount_price",
      formData.discount_price
    );
    data.append("stock", formData.stock);
    data.append("featured", formData.featured);

    if (formData.image) {

      data.append("image", formData.image);

    }

    try {

      await API.put(
        `products/edit/${id}/`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Product updated successfully");

      navigate("/vendor-products");

    } catch (err) {

      console.log(
        err.response?.data || err.message
      );

      alert("Update failed");

    }
  };

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7ed] via-[#ffffff] to-[#fef3c7]">

        <div className="h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#ffffff] to-[#fef3c7] py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* CARD */}

        <div className="bg-white/90 backdrop-blur-xl border border-orange-100 rounded-[32px] shadow-2xl overflow-hidden">

          {/* HEADER */}

          <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 p-8 text-white">

            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex items-center gap-4">

              <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">

                <Package size={32} />

              </div>

              <div>

                <h1 className="text-4xl font-extrabold">

                  Edit Product

                </h1>

                <p className="text-white/90 mt-1">

                  Update and manage your product details

                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
          >

            {/* PRODUCT NAME */}

            <Input
              icon={<Package size={18} />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />

            {/* SLUG */}

            <Input
              icon={<Tag size={18} />}
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Slug"
            />

            {/* CATEGORY */}

            <div>

              <label className="text-gray-700 font-semibold mb-2 block">

                Product Category

              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
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

            {/* DESCRIPTION */}

            <div>

              <label className="text-gray-700 font-semibold mb-2 block">

                Product Description

              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write product description..."
                className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
              />

            </div>

            {/* PRICE GRID */}

            <div className="grid md:grid-cols-3 gap-5">

              <Input
                icon={<IndianRupee size={18} />}
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />

              <Input
                icon={<Star size={18} />}
                name="discount_price"
                value={formData.discount_price}
                onChange={handleChange}
                placeholder="Discount Price"
              />

              <Input
                icon={<Boxes size={18} />}
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
              />

            </div>

            {/* FEATURED */}

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center">

                  <Sparkles size={20} />

                </div>

                <div>

                  <h3 className="font-bold text-gray-800">

                    Featured Product

                  </h3>

                  <p className="text-sm text-gray-500">

                    Highlight this product on homepage

                  </p>

                </div>

              </div>

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-5 w-5 accent-orange-500"
              />

            </div>

            {/* IMAGE SECTION */}

            <div className="grid md:grid-cols-2 gap-6">

              {/* CURRENT IMAGE */}

              {existingImage && (

                <div>

                  <p className="text-gray-700 font-semibold mb-3">

                    Current Image

                  </p>

                  <div className="rounded-3xl overflow-hidden border border-orange-100 shadow-lg">

                    <img
                      src={existingImage}
                      alt="Product"
                      className="w-full h-64 object-cover"
                    />

                  </div>

                </div>

              )}

              {/* NEW IMAGE */}

              <div>

                <p className="text-gray-700 font-semibold mb-3">

                  Upload New Image

                </p>

                <label className="border-2 border-dashed border-orange-200 bg-orange-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-400 transition">

                  <ImagePlus
                    size={40}
                    className="text-orange-500 mb-4"
                  />

                  <h3 className="font-bold text-gray-800">

                    Choose Product Image

                  </h3>

                  <p className="text-sm text-gray-500 mt-1">

                    PNG, JPG supported
                  </p>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </label>

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-[1.01] hover:shadow-2xl text-white font-bold py-4 rounded-2xl transition duration-300 flex items-center justify-center gap-3"
            >

              <Save size={20} />

              Update Product

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

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

export default EditProduct;