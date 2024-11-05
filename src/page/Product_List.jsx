// src/components/ProductList.js
import React, { useState } from "react";
import useProductCategories from "../hook/useAllProductCategories";
import useCategoryProducts from "../hook/useSingleProductCategories";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const ProductList = () => {
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useProductCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc"); // Default order

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useCategoryProducts(selectedCategory, sortBy, order);

  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value.replace(/\s+/g, "-"));
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loadingCategories) return <p>Loading categories...</p>;
  if (errorCategories) return <p>Error: {errorCategories}</p>;

  return (
    <div className="flex relative mt-16">
      <div className="w-1/4 h-[580px] my-2 sticky border-2 p-4">
        <h2 className="text-xl font-extrabold">Select Category</h2>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="w-full p-2 border rounded my-4"
        >
          <option value="">All Categories</option>
          {categories.map((item, index) => (
            <option key={index} value={item.name.replace(/\s+/g, "-")}>
              {item.name.replace(/\s+/g, "-")}
            </option>
          ))}
        </select>

        {/* Sorting Controls */}
        <h2 className="text-xl font-extrabold mt-6">Sort By</h2>
        <select
          onChange={handleSortByChange}
          value={sortBy}
          className="w-full p-2 border rounded my-2"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <h2 className="text-xl font-extrabold mt-4">Order</h2>
        <button
          onClick={toggleOrder}
          className="w-full p-2 border rounded my-2 bg-blue-500 text-white"
        >
          {order === "asc" ? "High to Low" : "Low to High"}
        </button>
      </div>

      <div className="border-2 m-2 w-full overflow-y-auto p-4">
        <h2 className="text-2xl text-center font-extrabold">Product List</h2>
        <hr className="my-6" />
        {loadingProducts && (
          <h1 className="text-2xl text-center">Loading products...</h1>
        )}
        {errorProducts && <p>Error: {errorProducts}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-lg">
              <Link to={`/product-details/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-blue-500 font-semibold mt-2">
                  Price: ${product.price}
                </p>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-500 text-white rounded-xl p-2 mt-4"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
