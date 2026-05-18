import { createSlice } from "@reduxjs/toolkit";

const getUserCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `cart_${user.username}` : "guest_cart";
};

const loadCart = () => {
  const key = getUserCartKey();
  return JSON.parse(localStorage.getItem(key)) || [];
};

const saveCart = (cartItems) => {
  const key = getUserCartKey();
  localStorage.setItem(key, JSON.stringify(cartItems));
};

const initialState = {
  cartItems: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    addToCart: (state, action) => {

      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCart(state.cartItems);
    },

    removeFromCart: (state, action) => {

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      saveCart(state.cartItems);
    },

    increaseQty: (state, action) => {

      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.cartItems);
    },

    decreaseQty: (state, action) => {

  const item = state.cartItems.find(
    (item) => item.id === action.payload
  );

  if (!item) return;

  // ✅ decrease quantity
  if (item.quantity > 1) {

    item.quantity -= 1;

  } else {

    // ✅ remove item when quantity = 1
    state.cartItems = state.cartItems.filter(
      (i) => i.id !== action.payload
    );
  }

  saveCart(state.cartItems);
},

    clearCart: (state) => {

      state.cartItems = [];

      saveCart([]);
    },

    loadUserCart: (state) => {

      state.cartItems = loadCart();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  loadUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;