// src/hooks/useCategoryProducts.js
import { useState, useEffect } from "react";

const useCategoryProducts = (category, sortBy = "title", order = "asc") => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://dummyjson.com/products/category/${category}?sortBy=${sortBy}&order=${order}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, sortBy, order]);

  return { products, loading, error };
};

export default useCategoryProducts;
