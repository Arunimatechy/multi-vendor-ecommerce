
import { useEffect, useState } from "react";
import API from "../services/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  MessageSquare,
  Send,
} from "lucide-react";

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { access } = useSelector((state) => state.auth);
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const [loadingWish, setLoadingWish] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  
  // ================= PRODUCT FETCH =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError(null);
        const res = await API.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const scrollToReviews = () => {
      const el = document.getElementById("reviews");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    const timer = setTimeout(() => {
      if (
        window.location.hash === "#reviews" ||
        location.state?.scrollToReviews
      ) {
        scrollToReviews();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [product, id, location]);

  // ================= REVIEWS FETCH =================
  useEffect(() => {
    API.get(`reviews/product/${id}/`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ================= CAN REVIEW CHECK =================
  useEffect(() => {
    if (!access) return;

    API.get(`reviews/can-review/${id}/`)
      .then((res) => setCanReview(res.data.can_review))
      .catch((err) => console.log(err));
  }, [id, access]);

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    if (!access) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!product) return;

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }));

    toast.success(`${product.name} added to cart 🛒`);
  };

// ================= SUBMIT REVIEW =================
const handleSubmitReview = async () => {

  if (!comment.trim()) {
    toast.error("Please write review");
    return;
  }

  try {

    await API.post(
      `reviews/add/${id}/`,
      {
        rating,
        comment,
      }
    );

    toast.success("Review added successfully ⭐");

    // RESET FORM
    setComment("");
    setRating(5);

    // REFRESH REVIEWS
    const res = await API.get(
      `reviews/product/${id}/`
    );

    setReviews(res.data);

    // HIDE REVIEW FORM
    setCanReview(false);

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data?.error ||
      "Failed to submit review"
    );
  }
};

  // ================= ADD TO WISHLIST (FIXED ONLY THIS PART) =================
  
const handleAddToWishlist = async () => {
  if (!access) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  if (!product) return;

  const exists = wishlistItems.find(
    (item) => item.id === product.id
  );

  setLoadingWish(true);

  try {
    if (exists) {
      // ❌ REMOVE FROM WISHLIST
      await API.delete(`wishlist/remove/${product.id}/`);

      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist 💔");
    } else {
      // ✅ ADD TO WISHLIST
      await API.post(`wishlist/add/${id}/`);

      dispatch(addToWishlist({
        id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
      }));

      toast.success("Added to wishlist ❤️");
    }
  } catch (err) {
    console.log(err);
    toast.error("Wishlist action failed ❌");
  }

  setLoadingWish(false);
};
  

  // ================= LOADING =================
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-red-500 text-2xl font-bold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="grid md:grid-cols-2 gap-10 p-8">

          {/* IMAGE */}
          <div className="flex justify-center items-center">
            <img src={product.image} className="max-h-112.5" />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <h2 className="text-2xl text-pink-600 mt-4">
              ₹ {product.price}
            </h2>

            <div className="flex gap-4 mt-6">

              <button
                onClick={handleAddToCart}
                className="bg-pink-500 text-white px-6 py-3 rounded-xl"
              >
                <ShoppingCart /> Add To Cart
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={loadingWish}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
              >
                <Heart />
                {loadingWish ? "Adding..." : "Wishlist"}
              </button>

            </div>
          </div>

        </div>

        {/* REVIEWS (UNCHANGED) */}
        <div id="reviews" className="p-8 border-t">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <MessageSquare />
            Reviews
          </h2>

          {!access && (
            <p className="text-red-500 mb-3">
              Login required to write review
            </p>
          )}

          {access && !canReview && (
            <p className="text-gray-500 mb-3">
              You can review only after delivery
            </p>
          )}

          {access && canReview && (
            <>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 mb-3"
              >
                <option value="5">5 ⭐</option>
                <option value="4">4 ⭐</option>
                <option value="3">3 ⭐</option>
                <option value="2">2 ⭐</option>
                <option value="1">1 ⭐</option>
              </select>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border w-full p-3 mb-3"
              />
<button
  onClick={handleSubmitReview}
  className="bg-green-500 text-white px-5 py-2 rounded-xl flex items-center gap-2"
>
  <Send size={18} />
  Submit
</button>
            </>
          )}

          <div className="mt-8">
            {reviews.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="border p-3 mb-2">
                  <p>⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetail;