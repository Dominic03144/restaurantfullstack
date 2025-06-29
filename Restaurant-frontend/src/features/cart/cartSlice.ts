import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 🛒 Item structure in cart
export type CartItem = {
  id: number;
  menuName: string;
  price: number;
  quantity: number;
};

// 🛍️ Overall cart state
interface CartState {
  cartItems: any;
  items: CartItem[]; // ✅ Use only `items`, no need for `cartItems`
}

const initialState: CartState = {
  items: [],
  cartItems: undefined
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Add item or increase quantity if already in cart
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // ➖ Decrease quantity, or remove if it reaches 0
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.items.find(i => i.id === itemId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== itemId);
        }
      }
    },

    // ❌ Remove item from cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    // 🧹 Clear all items
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// ✅ Export actions and reducer
export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
