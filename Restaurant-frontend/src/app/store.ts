import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

import { authApi } from "../features/auth/authAPI";

// Combine root reducer with RTK Query reducer
const combinedReducer = combineReducers({
  ...rootReducer,
  [authApi.reducerPath]: authApi.reducer,
});

// Persist config (excluding api slice)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth, not the api state
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
