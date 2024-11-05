// Navbar.js
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [text, setText] = useState(""); // State to hold the search input text
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleSearchText = (e) => {
    setText(e.target.value); // Update search text state when input changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: { query: text } }); // Navigate to search page with query
  };

  return (
    <div className="fixed top-0 z-50 w-full h-14 bg-slate-200 flex flex-col sm:flex-row justify-between px-6 sm:px-10 md:px-24 items-center gap-4">
      <div className="text-center sm:text-left">
        <Link to="/" className="text-xl sm:text-2xl font-bold cursor-pointer">
          E-commerce
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex items-center border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden w-full sm:w-80">
        <input
          type="text"
          value={text}
          onChange={handleSearchText}
          placeholder="Search Product"
          className="w-full pl-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none"
        />
        <button type="submit" className="text-black p-2 px-4 transition duration-300 ease-in-out">
          <IoSearch size={20} />
        </button>
      </form>

      <div className="text-center sm:text-left">
        <ul className="flex justify-center sm:justify-between font-extrabold text-base sm:text-lg gap-4 sm:gap-8">
          <Link to="product-list" className="cursor-pointer">Category</Link>
          <Link to="cart" className="relative cursor-pointer flex items-center">
            <span className="mr-2">Cart</span>
            <span className="absolute -top-2 -right-6 bg-red-500 w-7 h-5 text-xs text-white flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
