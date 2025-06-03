import type { CartItem } from "../types/cart";

export class CartService {
  private static readonly STORAGE_KEY = "cart";

  /**
   * Retrieve cart items from localStorage
   */
  static getCart(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(this.STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  }

  /**
   * Save current cart to localStorage
   */
  static saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }

  /**
   * Remove cart from localStorage
   */
  static clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Calculate total number of items in cart
   */
  static calculateTotalQuantity(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Calculate total price of all items in cart
   */
  static calculateCartTotal(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /**
   * Add or update cart item, or remove if quantity is zero
   */
  static updateCartItem(
    cart: CartItem[],
    product: Omit<CartItem, "quantity">,
    quantity: number
  ): CartItem[] {
    if (quantity === 0) {
      // Remove item from cart
      return cart.filter((item) => item.id !== product.id);
    }

    const itemExists = cart.find((item) => item.id === product.id);

    if (itemExists) {
      // Update quantity for existing item
      return cart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      );
    }

    // Add new item cart
    return [...cart, { ...product, quantity }];
  }
}
