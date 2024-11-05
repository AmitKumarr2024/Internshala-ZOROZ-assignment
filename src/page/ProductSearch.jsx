
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearchProducts from "../hook/useSearchProducts";

const ProductSearch = () => {
  const location = useLocation(); // Get the current location object
  const query = location.state?.query || ""; // Get query from navigation state, default to empty string
  const { products, loading, error } = useSearchProducts(query); // Fetch products based on the search query

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Search</h2>
      {loading && <p>Loading...</p>} // Show loading message while products are being fetched
      {error && <p className="text-red-500">Error: {error}</p>} // Show error message if there's an error

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-lg">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-blue-500 font-semibold mt-2">
              Price: ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch; // Export the ProductSearch component
