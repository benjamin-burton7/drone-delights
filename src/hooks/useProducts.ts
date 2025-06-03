import { useEffect, useState } from "react";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

// Custom hook for loading and managing product list with filtering and search
export function useProducts() {
  // Product list fetched from backend/service
  const [products, setProducts] = useState<Product[]>([]);

  // Filter state
  const [activeFilter, setActiveFilter] = useState("Allt");

  // Search input state
  const [searchTerm, setSearchTerm] = useState("");

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await ProductService.fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  // Derived value: filtered category and search term
  const filteredProducts = ProductService.filterProducts(
    products,
    activeFilter,
    searchTerm
  );

  // Expose original and filtered product list, plus control setters
  return {
    products,
    filteredProducts,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
  };
}
