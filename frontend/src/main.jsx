import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-image-gallery/styles/css/image-gallery.css";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <div className="container mx-auto px-4">
        <ToastContainer position="top-right" />
        <App />
      </div>
    </Provider>
  </StrictMode>
);
