import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilters } from './productAPI';

const initialState = {
  products: [], // Array to store all products.
  categories: [], // Array to store all categories.
  brands: [], // Array to store all brands.
  status: 'idle', // Represents the async operation status ('idle', 'loading', 'succeeded', 'failed').
  totalItems: 0, // Total number of items based on filters (for pagination).
  selectedProduct: null, // The product object selected by ID.
};

// Async Thunk for fetching all products.
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data; // Returns an array containing all products.
  }
);

// Async Thunk for fetching products based on filters.
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data; // Returns an object containing products and totalItems count.
  }
);

// Async Thunk for fetching all categories.
export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data; // Returns an array containing all categories.
  }
);

// Async Thunk for fetching all brands.
export const fetchBrandsAsync = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data; // Returns an array containing all brands.
  }
);

// Async Thunk for fetching a product by its ID.
export const fetchProductByIdAsync = createAsyncThunk(
  'brands/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data; // Returns the product object corresponding to the given ID.
  }
);

// Creates a Redux slice for product state management.
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      // Example reducer that increments the value (not being used in this implementation).
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when fetching all products.
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when fetching all products is successful.
        state.products = action.payload; // Updates the products array with the fetched products.
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when fetching products based on filters.
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when fetching products is successful.
        state.products = action.payload.products; // Updates the products array with the fetched products.
        state.totalItems = action.payload.totalItems; // Updates the totalItems count for pagination.
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when fetching all categories.
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when fetching all categories is successful.
        state.categories = action.payload; // Updates the categories array with the fetched categories.
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when fetching all brands.
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when fetching all brands is successful.
        state.brands = action.payload; // Updates the brands array with the fetched brands.
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when fetching a product by ID.
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when fetching a product by ID is successful.
        state.selectedProduct = action.payload; // Updates the selectedProduct with the fetched product data.
      })
  },
});

export const { increment } = productSlice.actions;

// Selectors to access specific parts of the product state
export const selectAllProducts = (state) => state.product.products; // Selects all products from the state.
export const selectStatus = (state) => state.product.status; // Selects the async operation status from the state.
export const selectTotalItems = (state) => state.product.totalItems; // Selects the totalItems count from the state.
export const selectCategories = (state) => state.product.categories; // Selects all categories from the state.
export const selectBrands = (state) => state.product.brands; // Selects all brands from the state.
export const selectProductById = (state) => state.product.selectedProduct; // Selects the selectedProduct from the state.

export default productSlice.reducer;
