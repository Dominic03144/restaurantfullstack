import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner"; // ✅ For toast notifications

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <App />
          <Toaster richColors position="top-center" />
        </>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
