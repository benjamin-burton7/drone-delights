import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { CartService } from "../services/CartService";
import type { CartContextType, CartItem } from "../types/cart";
// Create context for cart
const CartContext = createContext<CartContextType | undefined>(undefined);
// Ensures the context is used within a provider
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
// CartProvider wraps components that need access to cart state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cart state from local storage (via service)
  const [cart, setCart] = useState<CartItem[]>(() => {
    return CartService.getCart();
  });
  // Derived value: total number of items in cart
  const totalQuantity = CartService.calculateTotalQuantity(cart);
  // Persist cart to storage whenever it changes
  useEffect(() => {
    CartService.saveCart(cart);
  }, [cart]);
  // Update or add an item in the cart
  const updateItem = (
    product: Omit<CartItem, "quantity">,
    quantity: number
  ) => {
    setCart((prevCart) => {
      return CartService.updateCartItem(prevCart, product, quantity);
    });
  };
  // Clear cart and remove from storage
  const clearCart = () => {
    setCart([]);
    CartService.clearCart();
  };
  // Provide cart state and actions to children
  return (
    <CartContext.Provider
      value={{ cart, totalQuantity, updateItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
