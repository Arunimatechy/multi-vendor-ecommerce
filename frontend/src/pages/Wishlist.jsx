import { useEffect } from "react";
import API from "../services/axios";
import toast from "react-hot-toast";

import { ShoppingCart, Zap, Heart } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

import { useNavigate } from "react-router-dom";

import {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
} from "../features/wishlist/wishlistSlice";

function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const { access } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= FETCH =================
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await API.get("wishlist/");
        dispatch(setWishlist(res.data));
      } catch (err) {
        toast.error("Failed to load wishlist");
      }
    };

    if (access) fetchWishlist();
  }, [access, dispatch]);

  // ================= TOGGLE =================
  const toggleWishlist = async (item) => {
    const exists = items.find((i) => i.id === item.id);

    if (exists) {
      // ✅ INSTANT REMOVE (FIX NAVBAR LAG)
      dispatch(removeFromWishlist(item.id));

      try {
        await API.delete(`wishlist/remove/${item.id}/`);
        toast.success("Removed ❤️");
      } catch (err) {
        toast.error("Failed ❌");
        dispatch(setWishlist(items)); // rollback
      }
    } else {
      const newItem = {
        id: item.product,
        product_name: item.product_name,
        product_price: item.product_price,
        product_image: item.product_image,
      };

      // ✅ INSTANT ADD
      dispatch(addToWishlist(newItem));

      try {
        await API.post(`wishlist/add/${item.product}/`);
        toast.success("Added ❤️");
      } catch (err) {
        toast.error("Failed ❌");
        dispatch(setWishlist(items)); // rollback
      }
    }
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.product,
        name: item.product_name,
        price: item.product_price,
        image: item.product_image,
      })
    );
    toast.success("Added to cart 🛒");
  };

  const handleBuyNow = (item) => {
    dispatch(
      addToCart({
        id: item.product,
        name: item.product_name,
        price: item.product_price,
        image: item.product_image,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-500">
            Wishlist is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {items.map((item) => {
              const liked = items.some((i) => i.id === item.id);

              return (
                <div key={item.id} className="bg-white rounded-2xl shadow p-5">

                  <div className="relative">
                    <img
                      src={item.product_image}
                      className="w-full h-64 object-cover rounded-xl"
                    />

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full"
                    >
                      <Heart
                        className={
                          liked
                            ? "text-pink-500 fill-pink-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>

                  <h2 className="text-xl font-bold mt-3">
                    {item.product_name}
                  </h2>

                  <p className="text-pink-600 font-bold">
                    ₹ {item.product_price}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-500 text-white py-2 rounded-xl"
                    >
                      Cart
                    </button>

                    <button
                      onClick={() => handleBuyNow(item)}
                      className="bg-orange-500 text-white py-2 rounded-xl"
                    >
                      Buy
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;