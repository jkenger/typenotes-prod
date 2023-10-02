import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-left"
        toastOptions={{
          className: "w-[260px] text-sm text-left rounded-sm font-bold",
          success: {
            iconTheme: {
              primary: "	#facc15",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "	#ef4444",
              secondary: "white",
            },
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);
