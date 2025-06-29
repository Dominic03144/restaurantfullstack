import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import { orderApi } from "../api/orderAPI";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

// Create a persisted reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // only persist auth and cart slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(orderApi.middleware),
});

// Create the persistor
export const persistor = persistStore(store);

// Export types for use in app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
