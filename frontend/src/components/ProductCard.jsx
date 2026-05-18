

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../features/cart/cartSlice";
// import toast from "react-hot-toast";
// import { ShoppingCart, Tag } from "lucide-react";

// function ProductCard({ product }) {

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const { access } = useSelector((state) => state.auth);

//   // =========================
//   // ADD TO CART
//   // =========================
//   const handleAddToCart = () => {

//     if (!access) {

//       toast.error("Please login first");

//       navigate("/login");

//       return;
//     }

//     dispatch(addToCart(product));

//     toast.success(`${product.name} added to cart 🛒`);
//   };

//   // =========================
//   // DISCOUNT CALCULATION
//   // =========================
//   const hasDiscount =
//     product.discount_price &&
//     Number(product.discount_price) < Number(product.price);

//   const discountPercentage = hasDiscount
//     ? Math.round(
//         (
//           (product.price - product.discount_price) /
//           product.price
//         ) * 100
//       )
//     : 0;

//   return (

//     <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 group">

//       {/* ================= IMAGE SECTION ================= */}

//       <div className="relative h-72 w-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">

//         {/* DISCOUNT BADGE */}
//         {hasDiscount && (

//           <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">

//             <Tag size={12} />

//             {discountPercentage}% OFF

//           </div>
//         )}

//         {/* FEATURED BADGE */}
//         {product.featured && (

//           <div className="absolute top-4 right-4 z-10 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">

//             Featured

//           </div>
//         )}

//         <img
//           src={
//             product.image ||
//             "https://via.placeholder.com/300"
//           }
//           alt={product.name}
//           className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
//         />

//       </div>

//       {/* ================= DETAILS ================= */}

//       <div className="p-5">

//         {/* CATEGORY */}
//         <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">

//           {product.category}

//         </p>

//         {/* PRODUCT NAME */}
//         <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-14 leading-snug">

//           {product.name}

//         </h3>

//         {/* PRICE */}
//         <div className="flex items-center justify-between mt-4">

//           <div className="flex flex-col">

//             {hasDiscount ? (

//               <>
//                 <div className="flex items-center gap-2">

//                   <p className="text-2xl font-bold text-gray-900">

//                     ₹ {product.discount_price}

//                   </p>

//                   <p className="text-sm text-gray-400 line-through">

//                     ₹ {product.price}

//                   </p>

//                 </div>

//                 <span className="text-green-600 text-sm font-medium">

//                   You save ₹
//                   {product.price - product.discount_price}

//                 </span>
//               </>

//             ) : (

//               <p className="text-2xl font-bold text-gray-900">

//                 ₹ {product.price}

//               </p>
//             )}

//           </div>

//           {/* STOCK */}
//           <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">

//             In Stock

//           </span>

//         </div>

//         {/* ================= BUTTONS ================= */}

//         <div className="mt-6 grid grid-cols-2 gap-3">

//           {/* VIEW BUTTON */}
//           <Link
//             to={`/product/${product.id}`}
//             className="flex items-center justify-center bg-gray-900 hover:bg-black text-white py-3 rounded-2xl font-medium transition-all"
//           >

//             View

//           </Link>

//           {/* ADD TO CART */}
//           <button
//             onClick={handleAddToCart}
//             className="flex items-center justify-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-white py-3 rounded-2xl font-medium transition-all"
//           >

//             <ShoppingCart size={18} />

//             Add To Cart

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ProductCard;
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { ShoppingCart, Tag } from "lucide-react";
import API from "../services/axios";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access } = useSelector((state) => state.auth);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    if (!access) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart 🛒`);
  };

  // =========================
  // FAST VIEW NAVIGATION (FIX)
  // =========================
  const handleView = () => {
    navigate(`/product/${product.id}`);
  };

  // =========================
  // PREFETCH (MAKES VIEW INSTANT)
  // =========================
  const handlePrefetch = () => {
    API.get(`products/${product.id}/`);
  };

  // =========================
  // DISCOUNT CALCULATION
  // =========================
  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 group">

      {/* IMAGE */}
      <div className="relative h-72 w-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">

        {/* DISCOUNT BADGE */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Tag size={12} />
            {discountPercentage}% OFF
          </div>
        )}

        {/* FEATURED */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-10 bg-black text-white text-xs px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* DETAILS */}
      <div className="p-5">

        <p className="text-xs uppercase text-gray-400 mb-2">
          {product.category}
        </p>

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-14">
          {product.name}
        </h3>

        {/* PRICE */}
        <div className="flex items-center justify-between mt-4">

          <div>
            {hasDiscount ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    ₹ {product.discount_price}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ₹ {product.price}
                  </p>
                </div>

                <span className="text-green-600 text-sm">
                  Save ₹ {product.price - product.discount_price}
                </span>
              </>
            ) : (
              <p className="text-2xl font-bold">
                ₹ {product.price}
              </p>
            )}
          </div>

          <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
            In Stock
          </span>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          {/* FAST VIEW BUTTON */}
          <button
            onMouseEnter={handlePrefetch}
            onClick={handleView}
            className="flex items-center justify-center bg-gray-900 hover:bg-black text-white py-3 rounded-2xl font-medium transition-all"
          >
            View
          </button>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-white py-3 rounded-2xl font-medium transition-all"
          >
            <ShoppingCart size={18} />
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;