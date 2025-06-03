// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { CartProvider } from "./contexts/CartContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FavoriteProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoriteProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
