

import { useEffect, useState } from "react";
import API from "../services/axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  Heart,
  MessageSquare,
  Send,
  Star,
  ShieldCheck,
} from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { access } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const [loadingWish, setLoadingWish] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // ================= PRODUCT =================
  useEffect(() => {
    API.get(`products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  // ================= REVIEWS =================
  useEffect(() => {
    API.get(`reviews/product/${id}/`)
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!access) return;
    API.get(`reviews/can-review/${id}/`)
      .then((res) => setCanReview(res.data.can_review))
      .catch(() => {});
  }, [id, access]);

  // ================= CART =================
  const handleAddToCart = () => {
    if (!access) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );

    toast.success("Added to cart 🛒");
  };

  // ================= WISHLIST =================
  const handleAddToWishlist = async () => {
    if (!access) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    const exists = wishlistItems.find((i) => i.id === product.id);

    setLoadingWish(true);

    try {
      if (exists) {
        await API.delete(`wishlist/remove/${product.id}/`);
        dispatch(removeFromWishlist(product.id));
        toast.success("Removed ❤️");
      } else {
        await API.post(`wishlist/add/${id}/`);
        dispatch(
          addToWishlist({
            id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image: product.image,
          })
        );
        toast.success("Added ❤️");
      }
    } catch {
      toast.error("Wishlist failed");
    }

    setLoadingWish(false);
  };

  // ================= LOADING =================
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-orange-50">
        <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 py-14 px-4">

      <div className="max-w-6xl mx-auto">

        {/* MAIN CARD */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl shadow-2xl overflow-hidden">

          <div className="grid md:grid-cols-2 gap-12 p-12">

            {/* IMAGE SECTION */}
            <div className="flex items-center justify-center rounded-3xl bg-linear-to-br from-pink-50 via-white to-orange-50 p-8 relative overflow-hidden">

              <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>

              <img
                src={product.image}
                className="max-h-105 object-contain drop-shadow-2xl relative z-10 transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* DETAILS */}
            <div>

              <span className="text-xs font-bold tracking-widest text-pink-500 uppercase">
                Premium Product
              </span>

              <h1 className="text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
                {product.name}
              </h1>

              <p className="text-gray-500 mt-5 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
                <ShieldCheck size={16} />
                <span className="text-sm font-semibold">
                  Verified Quality Product
                </span>
              </div>

              <h2 className="text-4xl font-black text-pink-600 mt-6">
                ₹ {product.price}
              </h2>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-10">

                <button
                  onClick={handleAddToCart}
                  className="
                    flex items-center gap-2
                    px-6 py-3 rounded-2xl
                    bg-linear-to-r from-pink-500 to-orange-400
                    text-white font-bold
                    shadow-lg hover:shadow-xl
                    hover:scale-105 transition
                  "
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>

                <button
                  onClick={handleAddToWishlist}
                  disabled={loadingWish}
                  className="
                    flex items-center gap-2
                    px-6 py-3 rounded-2xl
                    bg-white border border-pink-200
                    text-pink-600 font-semibold
                    hover:bg-pink-50 transition
                    disabled:opacity-50
                  "
                >
                  <Heart size={18} />
                  {loadingWish ? "Loading..." : "Wishlist"}
                </button>

              </div>
            </div>

          </div>

          {/* REVIEWS SECTION */}
          <div className="border-t bg-linear-to-b from-white to-pink-50 p-12">

            <h2 className="text-2xl font-extrabold flex items-center gap-2 text-gray-900">
              <MessageSquare />
              Customer Reviews
            </h2>

            <div className="mt-6 space-y-4">

              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet</p>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
                  >
                    <p className="font-bold text-yellow-500 flex items-center gap-1">
                      <Star size={14} />
                      {r.rating}
                    </p>
                    <p className="text-gray-600 mt-2">
                      {r.comment}
                    </p>
                  </div>
                ))
              )}

            </div>

            {/* REVIEW BOX */}
            {access && canReview && (
              <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border">

                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="border p-3 rounded-xl w-full mb-4 focus:ring-2 focus:ring-pink-400 outline-none"
                >
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border w-full p-4 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Write your review..."
                />

                <button
                  onClick={async () => {
                    await API.post(`reviews/add/${id}/`, {
                      rating,
                      comment,
                    });
                    toast.success("Review added");
                    setComment("");
                  }}
                  className="
                    mt-4
                    bg-linear-to-r from-pink-500 to-orange-400
                    text-white px-6 py-3 rounded-xl
                    flex items-center gap-2
                    font-semibold
                    hover:scale-105 transition
                  "
                >
                  <Send size={16} />
                  Submit Review
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;