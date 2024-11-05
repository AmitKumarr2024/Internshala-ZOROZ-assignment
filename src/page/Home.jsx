import React from "react"; 
import useProducts from "../hook/useProducts"; 
import { Link } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const Home = () => {
  const { products, loading, error } = useProducts(); // Fetch products, loading status, and error

  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleAddToCart = (product) => { // Function to handle adding products to cart
    console.log("product", product); // Log the product being added
    dispatch(addToCart(product)); // Dispatch action to add product to cart
  };

  if (loading) // If products are still loading
    return <p className="text-center text-xl">Loading products...</p>; // Show loading message
  if (error) return <p className="text-center text-red-500">{error}</p>; // Show error message if there's an error

  return (
    <>
      <h2 className="text-center text-3xl font-extrabold mt-16 mb-4 text-blue-600">
        All <span className="text-red-500">{products.length}</span>
        &nbsp;Products Items Are available
      </h2>
      <div className="flex justify-evenly items-center w-full">
        <ul className="flex flex-wrap gap-8 justify-center max-w-full p-4">
          {products.map((product) => ( // Map over each product to display
            <div
              key={product.id} // Unique key for each product
              className="w-80 bg-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              <Link to={`product-details/${product.id}`}> // Link to product details
                <img
                  src={product.thumbnail} // Product image
                  alt={product.title} // Image alt text
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 text-center mb-2">
                  {product.title} // Product title
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description} // Product description
                </p>
                <p className="text-blue-500 text-lg font-bold text-center">
                  Price: ${product.price} // Product price
                </p>
                <div className="mt-9">
                  <button
                    onClick={() => handleAddToCart(product)} // Handle adding product to cart
                    className="w-full bg-blue-500 text-white rounded-xl p-2 mt-4"
                  >
                    Add to Cart // Button text
                  </button>
                </div>
              </div>
            </div>
          ))} // End of products map
        </ul>
      </div>
    </>
  );
};

export default Home; // Export Home component
