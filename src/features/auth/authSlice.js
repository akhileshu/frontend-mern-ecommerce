import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './authAPI';

const initialState = {
  loggedInUser: null, // Represents the currently logged-in user, initially set to null.
  status: 'idle', // Represents the async operation status ('idle', 'loading', 'succeeded', 'failed').
  error: null, // Stores any error that occurs during async operations.
};

// Async Thunk for creating a new user
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData); // Calls the API to create a new user.
    return response.data; // Returns the user data from the API response.
  }
);

// Async Thunk for checking user credentials
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo); // Calls the API to check user credentials.
    return response.data; // Returns the user data from the API response.
  }
);

// Creates a Redux slice for user state management
export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedInUser = null; // Clears the logged-in user when logging out.
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when creating a new user.
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when the user creation is successful.
        state.loggedInUser = action.payload; // Updates the logged-in user with the created user data.
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading'; // Sets the status to 'loading' when checking user credentials.
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when the user credentials are correct.
        state.loggedInUser = action.payload; // Updates the logged-in user with the user data from the API response.
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle'; // Sets the status back to 'idle' when the user credentials check is rejected.
        state.error = action.error; // Updates the error state with the error information from the rejected action.
      });
  },
});

// Selectors to access specific parts of the user state
export const selectLoggedInUser = (state) => state.auth.loggedInUser; // Selects the logged-in user from the state.
export const selectError = (state) => state.auth.error; // Selects the error from the state.

export const { logout } = counterSlice.actions;

export default counterSlice.reducer;
