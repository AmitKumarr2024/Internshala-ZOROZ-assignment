import React from "react";
import useSingleProduct from "../hook/useSingleProduct";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductDetails = () => {
  const { id } = useParams(); // Retrieve the id parameter from the URL
  const { product, loading, error } = useSingleProduct(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log("product", product);

    dispatch(addToCart(product));
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto my-8 p-4">
      {product ? (
        <div className="justify-center flex flex-col lg:flex-row  items-center bg-white  rounded-lg overflow-hidden">
          <img
            src={product.thumbnail}
            className=" lg:w-1/3 h-auto object-cover border-2 rounded-lg"
            alt={product.title}
          />
          <div className="flex flex-col gap-6 justify-between  p-6 lg:w-1/2">
            <h3 className="font-bold text-2xl text-slate-400 mb-2">
              Product Description
            </h3>
            <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 mb-4">
              Rating:{" "}
              <span className="font-extrabold text-yellow-500 text-2xl">
                {product.rating}
              </span>
            </p>

            <p className="text-lg  text-slate-600">
              stock left:{" "}
              <span className="font-extrabold text-2xl text-green-400">
                {product.stock}
              </span>{" "}
              <br />
            </p>

            <p className="text-lg  text-slate-600">
              Category: <span className="font-bold">{product.category}</span>
            </p>

            <p className="text-lg font-bold text-blue-600">
              Price: ${product.price}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
            <br />
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Product not found.</p>
      )}
      <hr className="mt-3" />
      <p className="text-2xl font-bold my-4 text-center ">
        Reviews of customer
      </p>
      <div className="space-y-4">
        {product.reviews.map((review, index) => {
          console.log(review);

          return (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300"
            >
              <h2 className="text-lg font-bold text-gray-800">
                customer: {review.reviewerName}
              </h2>
              <p className="text-yellow-600 font-semibold">
                Rating: {review.rating} / 5
              </p>
              <p className="text-gray-700 mt-2">Comments: {review.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
