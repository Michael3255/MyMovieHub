import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/authContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);