import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, fetchItemsByUserId, updateCart,resetCart} from "./cartAPI";

const initialState = {
  items: [], // Array to store cart items
  status: "idle", // Represents the async operation status ('idle', 'loading', 'succeeded', 'failed').
};

// Async Thunk for adding an item to the cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (itme) => {
    const response = await addToCart(itme); // Calls the API to add an item to the cart.
    return response.data; // Returns the data of the added item from the API response.
  }
);

// Async Thunk for fetching cart items by user ID
export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemsByUserId(); // Calls the API to fetch cart items by user ID.
    return response.data; // Returns the cart items from the API response.
  }
);

// Async Thunk for updating an item in the cart
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update); // Calls the API to update an item in the cart.
    return response.data; // Returns the updated item data from the API response.
  }
);

// Async Thunk for deleting an item from the cart
export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (id) => {
    const response = await deleteItemFromCart(id); // Calls the API to delete an item from the cart.
    return id; // Returns the ID of the deleted item as it is not returned from the API response.
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    const response = await resetCart(); // Calls the API to delete an item from the cart.
    return response.status; // Returns the ID of the deleted item as it is not returned from the API response.
  }
);

// Creates a Redux slice for cart state management
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      // Example reducer that increments the value (not being used in this implementation).
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when adding an item to the cart.
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when adding an item to the cart is successful.
        state.items.push(action.payload); // Adds the added item to the cart items list.
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when fetching cart items.
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when fetching cart items is successful.
        state.items = action.payload; // Updates the cart items with the fetched items from the API response.
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when updating an item in the cart.
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when updating an item in the cart is successful.
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ); // Updates the cart items with the updated item from the API response.
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when deleting an item from the cart.
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when deleting an item from the cart is successful.
        state.items = state.items.filter((item) => item.id !== action.payload); // Removes the deleted item from the cart items list.
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when deleting an item from the cart.
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when deleting an item from the cart is successful.
        state.items = []
      })
  },
});

export const { increment } = cartSlice.actions;

// Selector to access the cart items from the state
export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
