// hooks/useProducts.ts
import { useEffect, useState } from "react";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

// Custom hook for fetching and managing the product list
export function useProducts() {
  
  // State: full product list
  const [products, setProducts] = useState<Product[]>([]);

  // State: active category filter
  const [activeFilter, setActiveFilter] = useState("Allt");

  // State: search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Load product data once on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await ProductService.fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  // Derived: filter products by category and search term
  const filteredProducts = ProductService.filterProducts(
    products,
    activeFilter,
    searchTerm
  );

  return {
    products,
    filteredProducts,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
  };
}
