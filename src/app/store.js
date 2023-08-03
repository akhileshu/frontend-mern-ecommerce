// Importing the configureStore function from Redux Toolkit to set up the store.
import { configureStore } from '@reduxjs/toolkit';

// Importing the reducers for different slices of the application state.
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

// Creating the Redux store by configuring it with the combined reducers for product, auth, and cart slices.
export const store = configureStore({
  reducer: {
    product: productReducer, // Reducer for the product slice of the state.
    auth: authReducer, // Reducer for the authentication slice of the state.
    cart: cartReducer, // Reducer for the cart slice of the state.
  },
});
