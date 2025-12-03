import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CssBaseline,} from "@mui/material";
import "./index.css";
import "react-quill/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </>
);
