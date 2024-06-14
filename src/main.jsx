import React from "react";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BlogsProvider } from "./hooks/blogs";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogsProvider>
      <App />
    </BlogsProvider>
  </React.StrictMode>
);
