import type { Product } from "../types/product";

export class ProductService {
  // Predefined categories used in filters
  static readonly CATEGORIES = [
    "Allt",
    "Bakelser",
    "Matbröd",
    "Småkakor",
    "Tårtor",
    "Vetebröd",
  ];

  // Fetch all products from backend API
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

  // Filter products by category and search input
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

  // Return a subset of products by matching their IDs
  static getProductsByIds(products: Product[], ids: string[]): Product[] {
    return products.filter((product) => ids.includes(product.id.toString()));
  }

  // Return products that match specific category
  static getProductsByCategory(
    products: Product[],
    category: string
  ): Product[] {
    if (category === "Allt") return products;
    return products.filter((product) => product.category === category);
  }

  // Filter products using search input
  static searchProducts(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Calculate total price of items in cart
  static calculateCartTotal(
    cart: { price: number; quantity: number }[]
  ): number {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
