// React imports
import React from "react";
import ReactDOM from "react-dom/client";

// cookie provider
import { CookiesProvider } from "react-cookie";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// app component
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);
