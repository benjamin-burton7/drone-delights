import type { Product } from "../types/product";

export class ProductService {
  /**
   * Predefined product categories used for filtering in UI
   */
  static readonly CATEGORIES = [
    "Allt",
    "Bakelser",
    "Matbröd",
    "Småkakor",
    "Tårtor",
    "Vetebröd",
  ];

  /**
   * Fetches all products from backend API
   *
   * @returns A promise resolving to an array of products
   */
  static async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch products", error);
      return [];
    }
  }

  /**
   * Filters products based on category and search term
   *
   * @param products - List of all products
   * @param category - Selected category to filter by
   * @param searchTerm - User input for name-based search
   * @returns Filtered array of matching products
   */
  static filterProducts(
    products: Product[],
    category: string,
    searchTerm: string
  ): Product[] {
    return products.filter((product) => {
      const matchesCategory =
        category === "Allt" || product.category === category;

      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }

  /**
   * Returns products that match list of product IDs
   *
   * @param products - List of products to search
   * @param ids - Array of product IDs to include
   * @returns Array of matching products
   */
  static getProductsByIds(products: Product[], ids: string[]): Product[] {
    return products.filter((product) => ids.includes(product.id.toString()));
  }

  /**
   * Filters products by category
   *
   * @param products - Full product list
   * @param category - Selected category
   * @returns Filtered list by given category
   */
  static getProductsByCategory(
    products: Product[],
    category: string
  ): Product[] {
    if (category === "Allt") return products;
    return products.filter((product) => product.category === category);
  }

  /**
   * Searches products by name
   *
   * @param products - Full product list
   * @param searchTerm - Name or keyword to search for
   * @returns Array of matching products
   */
  static searchProducts(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Calculates total price of items in cart
   *
   * @param cart - Array of items with price and quantity
   * @returns Total cart cost
   */
  static calculateCartTotal(
    cart: { price: number; quantity: number }[]
  ): number {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
