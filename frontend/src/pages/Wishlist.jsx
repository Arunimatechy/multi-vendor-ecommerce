

import { useEffect } from "react";
import API from "../services/axios";
import toast from "react-hot-toast";

import { ShoppingCart, Zap, Heart, Trash2 } from "lucide-react";

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

  const toggleWishlist = async (item) => {
    const exists = items.find((i) => i.id === item.id);

    if (exists) {
      dispatch(removeFromWishlist(item.id));

      try {
        await API.delete(`wishlist/remove/${item.id}/`);
        toast.success("Removed ❤️");
      } catch (err) {
        toast.error("Failed ❌");
        dispatch(setWishlist(items));
      }
    } else {
      const newItem = {
        id: item.product,
        product_name: item.product_name,
        product_price: item.product_price,
        product_image: item.product_image,
      };

      dispatch(addToWishlist(newItem));

      try {
        await API.post(`wishlist/add/${item.product}/`);
        toast.success("Added ❤️");
      } catch (err) {
        toast.error("Failed ❌");
        dispatch(setWishlist(items));
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
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-rose-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-800 flex items-center gap-3">
            <Heart className="text-pink-500 fill-pink-500" />
            My Wishlist
          </h1>
          <p className="text-gray-500 mt-2">
            Your favorite products saved for later
          </p>
        </div>

        {/* EMPTY */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow">
            <Heart size={50} className="mx-auto text-pink-300" />
            <p className="text-gray-500 mt-4">Wishlist is empty</p>
          </div>
        ) : (

          /* GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {items.map((item) => {
              const liked = items.some((i) => i.id === item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden border border-pink-100"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">

                    <img
                      src={item.product_image}
                      className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                    />

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow"
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

                  {/* CONTENT */}
                  <div className="p-5">

                    <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {item.product_name}
                    </h2>

                    <p className="text-pink-600 font-extrabold text-xl mt-2">
                      ₹ {item.product_price}
                    </p>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-2 gap-3 mt-5">

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-semibold transition"
                      >
                        <ShoppingCart size={16} />
                        Cart
                      </button>

                      <button
                        onClick={() => handleBuyNow(item)}
                        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold transition"
                      >
                        <Zap size={16} />
                        Buy
                      </button>

                    </div>

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