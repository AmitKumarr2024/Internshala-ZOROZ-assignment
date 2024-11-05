import { createSlice } from "@reduxjs/toolkit";

// Function to load cart data from localStorage
const loadCartFromLocalStorage = () => {
  try {
    // Get saved cart data from localStorage
    const savedCart = localStorage.getItem("cart");
    // If data exists, parse and return it; otherwise, return an empty array
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart data from localStorage:", error);
    return [];
  }
};

// Function to save cart data to localStorage
const saveCartToLocalStorage = (cartItems) => {
  try {
    // Convert cart items to a JSON string and save to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart data to localStorage:", error);
  }
};

// Cart slice with save-to-localStorage logic inside reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // Load initial cart items from localStorage
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    // Add an item to the cart
    addToCart: (state, action) => {
      // Check if the item is already in the cart
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        // If it exists, increase its quantity
        item.quantity += 1;
      } else {
        // If it doesn't exist, add it to the cart with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
    
    // Remove an item from the cart
    removeFromCart: (state, action) => {
      // Filter out the item with the matching ID from the cart
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },

    // Update the quantity of an item in the cart
    updateCartItem: (state, action) => {
      // Find the item with the matching ID
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        // Update its quantity to the new value
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
  },
});

// Export the cart actions and reducer for use in the app
export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
