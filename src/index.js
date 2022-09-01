import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { UserContextProvider } from "./store/user-Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <AuthContextProvider>
      <UserContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserContextProvider>
    </AuthContextProvider>
);
