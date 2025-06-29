import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import { orderAPI } from "../api/orderAPI";
import { addressAPI } from "../api/addressAPI"; // ✅ NEW

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [addressAPI.reducerPath]: addressAPI.reducer, // ✅ NEW
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(orderAPI.middleware)
      .concat(addressAPI.middleware), // ✅ NEW
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
