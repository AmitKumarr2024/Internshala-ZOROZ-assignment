import { useState, useEffect } from "react";

const useSearchProducts = (query) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { products, loading, error };
};

export default useSearchProducts;
