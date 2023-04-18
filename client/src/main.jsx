import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import { UserAuthContextProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
