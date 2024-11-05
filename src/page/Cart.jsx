// src/components/Cart.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState(0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Ensure quantity doesn't go below 1
    dispatch(updateCartItem({ id, quantity }));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    setAmount(Math.floor(totalPrice));
    setShowPaymentModal(true);
  };

  const handlePay = () => {
    // Payment processing logic here
    alert(`Payment of $${amount} processed successfully!`);
    setShowPaymentModal(false);
  };

  const handleCancel = () => {
    alert(`Payment of $${amount} processed Cancel, Try Again later`);
    setShowPaymentModal(false);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full mt-16 justify-center items-start gap-8">
      {/* Cart items side */}
      <div className="lg:w-2/3 p-9 border rounded-lg shadow-md m-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 border-b last:border-none"
            >
              <Link to={`/product-details/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              </Link>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 mr-2"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold mx-2">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 mr-2"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Payment summary side */}
      <div className="lg:w-1/3 m-6 p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-xl font-bold mb-4 text-center">Payment Summary</h2>
        <div className="flex flex-col space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-gray-700">{item.title}</span>
              <span className="text-gray-700 font-semibold">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter Payment Details
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="****"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePay}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Pay
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
