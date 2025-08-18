/**
 * index.js
 * ------------------------------
 * Entry point of the React application.
 * ReactDOM creates a root and renders App.jsx inside the #root element.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // your Tailwind/global css

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);