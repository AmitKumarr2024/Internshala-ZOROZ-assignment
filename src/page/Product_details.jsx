import React from "react";
import useSingleProduct from "../hook/useSingleProduct"; 
import { useParams } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { addToCart } from "../store/cartSlice"; 

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { product, loading, error } = useSingleProduct(id); // Fetch the product details using the custom hook

  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  const handleAddToCart = (product) => { // Function to handle adding a product to the cart
    console.log("product", product); // Log the product being added
    dispatch(addToCart(product)); // Dispatch the action to add the product to the cart
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>; // Show loading message while fetching product
  if (error) return <p className="text-center text-lg text-red-600">Error: {error}</p>; // Show error message if there's an issue

  return (
    <div className="container mx-auto my-8 p-4">
      {product ? ( // Check if product exists
        <div className="justify-center flex flex-col lg:flex-row  items-center bg-white  rounded-lg overflow-hidden">
          <img
            src={product.thumbnail} // Display product image
            className=" lg:w-1/3 h-auto object-cover border-2 rounded-lg"
            alt={product.title} // Image description
          />
          <div className="flex flex-col gap-6 justify-between  p-6 lg:w-1/2">
            <h3 className="font-bold text-2xl text-slate-400 mb-2">
              Product Description
            </h3>
            <h2 className="text-xl font-semibold mb-4">{product.title}</h2> // Display product title
            <p className="text-gray-700 mb-4">{product.description}</p> // Display product description
            <p className="text-gray-700 mb-4">
              Rating:{" "}
              <span className="font-extrabold text-yellow-500 text-2xl">
                {product.rating} // Display product rating
              </span>
            </p>

            <p className="text-lg  text-slate-600">
              stock left:{" "}
              <span className="font-extrabold text-2xl text-green-400">
                {product.stock} // Display available stock
              </span>{" "}
              <br />
            </p>

            <p className="text-lg  text-slate-600">
              Category: <span className="font-bold">{product.category}</span> // Display product category
            </p>

            <p className="text-lg font-bold text-blue-600">
              Price: ${product.price} // Display product price
            </p>
            <button
              onClick={() => handleAddToCart(product)} // Handle adding the product to the cart
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
            <br />
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Product not found.</p> // Show message if product not found
      )}
      <hr className="mt-3" />
      <p className="text-2xl font-bold my-4 text-center ">
        Reviews of customer
      </p>
      <div className="space-y-4">
        {product.reviews.map((review, index) => { // Map over product reviews
          console.log(review); // Log each review

          return (
            <div
              key={index} // Unique key for each review
              className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300"
            >
              <h2 className="text-lg font-bold text-gray-800">
                customer: {review.reviewerName} // Display reviewer's name
              </h2>
              <p className="text-yellow-600 font-semibold">
                Rating: {review.rating} / 5 // Display review rating
              </p>
              <p className="text-gray-700 mt-2">Comments: {review.comment}</p> // Display review comment
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetails; // Export the ProductDetails component
