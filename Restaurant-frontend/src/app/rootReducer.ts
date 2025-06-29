import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice"; // ✅ import cart slice

const rootReducer = {
  auth: authReducer,
  cart: cartReducer, // ✅ add cart to the root reducer
};

export default rootReducer;
