import { BrowserRouter } from "react-router-dom";
import React from "react";
import "@fontsource/rochester";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {AttempsProvider } from "./context/AttempsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AttempsProvider>
        <App />
      </AttempsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
