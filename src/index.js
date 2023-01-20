import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //Only components wrapper with the provider have access to the context
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
