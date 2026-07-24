import { useState, useEffect, useMemo } from "react";

export const useProductFilter = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand && product.brand !== selectedBrand) {
        return false;
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand]);

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))];
  }, [products]);

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    categories,
    brands,
  };
};
