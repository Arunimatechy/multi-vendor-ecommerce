


import React, { useCallback, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

import {
  ShoppingCart,
  Eye,
  CheckCircle2,
  Tag,
} from "lucide-react";

function ProductCard({ product }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const access = useSelector((state) => state.auth.access);

  // ================= IMAGE =================
  const imageUrl = useMemo(() => {

    if (product?.image && product.image.startsWith("http")) {
      return product.image;
    }

    if (product?.image) {
      return `${import.meta.env.VITE_API_URL}${product.image}`;
    }

    return "https://via.placeholder.com/300";

  }, [product?.image]);

  const optimizedImage = useMemo(() => {

    if (!imageUrl) return "https://via.placeholder.com/300";

    if (imageUrl.includes("res.cloudinary.com")) {
      return `${imageUrl}?f_auto,q_auto,w=500`;
    }

    return imageUrl;

  }, [imageUrl]);

  // ================= PRICE =================
  const price = Number(product?.price ?? 0);
  const discountPrice = Number(product?.discount_price ?? 0);

  const hasDiscount =
    discountPrice > 0 && discountPrice < price;

  const discountPercentage =
    hasDiscount
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  // ================= ADD TO CART =================
  const handleAddToCart = useCallback(() => {

    if (!access) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart 🛒`);

  }, [access, navigate, dispatch, product]);

  // ================= VIEW =================
  const handleView = useCallback(() => {
    if (!product?.id) return;
    navigate(`/product/${product.id}`);
  }, [navigate, product?.id]);

  return (

    <div className="
      group
      relative
      bg-white
      rounded-2xl
      overflow-hidden
      border border-gray-100
      shadow-sm
      hover:shadow-2xl
      transition-all duration-300
      hover:-translate-y-1
    ">

      {/* IMAGE SECTION */}
      <div className="relative h-72 bg-gray-50 overflow-hidden">

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">

          {hasDiscount && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {discountPercentage}% OFF
            </div>
          )}

          {product?.featured && (
            <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </div>
          )}

        </div>

        {/* STOCK BADGE */}
        {product?.stock > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-green-50 text-green-600 border border-green-100 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} />
            In Stock
          </div>
        )}

        {/* IMAGE */}
        <img
          src={optimizedImage}
          alt={product?.name || "product"}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="
            w-full h-full object-cover
            group-hover:scale-110
            transition duration-500
          "
        />

        {/* HOVER OVERLAY */}
        <div className="
          absolute inset-0
          bg-black/0
          group-hover:bg-black/10
          transition
        "></div>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* CATEGORY */}
        <div className="flex items-center justify-between mb-2">

          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            {product?.category}
          </p>

          <Tag size={14} className="text-gray-300" />

        </div>

        {/* PRODUCT NAME */}
        <h3 className="
          text-base font-semibold text-gray-900
          line-clamp-2 min-h-[48px]
          group-hover:text-pink-600
          transition
        ">
          {product?.name}
        </h3>

        {/* PRICE SECTION */}
        <div className="mt-4">

          {hasDiscount ? (
            <>
              <div className="flex items-center gap-2">

                <p className="text-xl font-extrabold text-gray-900">
                  ₹ {discountPrice}
                </p>

                <p className="text-sm text-gray-400 line-through">
                  ₹ {price}
                </p>

              </div>

              <p className="text-xs text-green-600 mt-1 font-medium">
                You save ₹ {price - discountPrice}
              </p>
            </>
          ) : (
            <p className="text-xl font-extrabold text-gray-900">
              ₹ {price}
            </p>
          )}

        </div>

        {/* BUTTONS */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          {/* VIEW BUTTON */}
          <button
            onClick={handleView}
            className="
              flex items-center justify-center gap-2
              bg-gray-100
              text-gray-800
              py-2.5 rounded-xl
              font-medium
              hover:bg-gray-200
              transition
            "
          >
            <Eye size={16} />
            View
          </button>

          {/* ADD BUTTON */}
          <button
            onClick={handleAddToCart}
            className="
              flex items-center justify-center gap-2
              bg-gradient-to-r from-gray-900 to-black
              hover:from-pink-500 hover:to-orange-400
              text-white
              py-2.5 rounded-xl
              font-semibold
              transition
              shadow-md
            "
          >
            <ShoppingCart size={16} />
            Add
          </button>

        </div>

      </div>
    </div>
  );
}

export default React.memo(ProductCard);