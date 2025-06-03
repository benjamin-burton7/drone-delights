// contexts/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { CartService } from "../services/CartService";
import type { CartContextType, CartItem } from "../types/cart";

// Create context for the cart
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Provider component that wraps children with cart state and logic
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cart from localStorage (via CartService)
  const [cart, setCart] = useState<CartItem[]>(() => CartService.getCart());

  // Derived value: total number of items in cart
  const totalQuantity = CartService.calculateTotalQuantity(cart);

  // Save cart to localStorage on every change
  useEffect(() => {
    CartService.saveCart(cart);
  }, [cart]);

  // Add or update cart item
  const updateItem = (
    product: Omit<CartItem, "quantity">,
    quantity: number
  ) => {
    setCart((prevCart) =>
      CartService.updateCartItem(prevCart, product, quantity)
    );
  };

  // Clear cart from state and storage
  const clearCart = () => {
    setCart([]);
    CartService.clearCart();
  };

  return (
    <CartContext.Provider
      value={{ cart, totalQuantity, updateItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
