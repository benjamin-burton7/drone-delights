import type { CartItem } from "../types/cart";

export class CartService {
  private static readonly STORAGE_KEY = "cart";

  // Retrieve cart items from localStorage
  static getCart(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(this.STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  }

  // Save the current cart state to localStorage
  static saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }

  // Remove the cart from localStorage
  static clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Calculate the total quantity of items in the cart
  static calculateTotalQuantity(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Calculate the total cost of the cart
  static calculateCartTotal(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Add, update, or remove an item from the cart
  static updateCartItem(
    cart: CartItem[],
    product: Omit<CartItem, "quantity">,
    quantity: number
  ): CartItem[] {
    if (quantity === 0) {
      // Remove item if quantity is set to 0
      return cart.filter((item) => item.id !== product.id);
    }

    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      // Update quantity if item exists
      return cart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      );
    } else {
      // Add new item to cart
      return [...cart, { ...product, quantity }];
    }
  }
}
