import React from "react";
import useProducts from "../hook/useProducts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const Home = () => {
  const { products, loading, error } = useProducts();


  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log("product", product);

    dispatch(addToCart(product));
  };

  if (loading)
    return <p className="text-center text-xl">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <h2 className="text-center text-3xl font-extrabold mt-16 mb-4 text-blue-600">
        All <span className="text-red-500">{products.length}</span>
        &nbsp;Products Items Are available
      </h2>
      <div className="flex justify-evenly items-center w-full">
        <ul className="flex flex-wrap gap-8 justify-center max-w-full p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-80 bg-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              <Link to={`product-details/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 text-center mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-blue-500 text-lg font-bold text-center">
                  Price: ${product.price}
                </p>
                <div className="mt-9">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-500 text-white rounded-xl p-2 mt-4"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
