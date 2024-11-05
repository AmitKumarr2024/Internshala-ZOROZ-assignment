import { useState, useEffect } from "react";

const useSingleProduct = (id) => {
  const [product, setProduct] = useState(null); // Singular 'product' since it's a single item
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data); // Assuming the API returns a single product object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchSingleProduct();
  }, [id]);

  return { product, loading, error };
};

export default useSingleProduct;
