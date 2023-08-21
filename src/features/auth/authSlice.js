import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, signOut, updateUser } from "./authAPI";

const initialState = {
  loggedInUserToken: null, // Represents the currently logged-in user, initially set to null.
  //  id/email/role
  status: "idle", // Represents the async operation status ('idle', 'loading', 'succeeded', 'failed').
  error: null
};

// Async Thunk for creating a new user
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData); // Calls the API to create a new user.
    return response.data; // Returns the user data from the API response.
  }
);

// Async Thunk for checking user credentials
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo); // Calls the API to check user credentials.
      return response.data; // Returns the user data from the API response.
    } catch (error) {
      return rejectWithValue(error); // Capture the specific error response from the server and store it in the Redux state.
    }
  }
);


export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// Creates a Redux slice for user state management
export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when creating a new user.
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when the user creation is successful.
        state.loggedInUserToken = action.payload; // Updates the logged-in user with the created user data.
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when checking user credentials.
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when the user credentials are correct.
        state.loggedInUserToken = action.payload; // Updates the logged-in user with the user data from the API response.
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when the user credentials check is rejected.
        // action.payload: Unauthorized
        state.error = action.payload; // Updates the error state with the error information from the rejected action.
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading"; // Sets the status to 'loading' when checking user credentials.
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle"; // Sets the status back to 'idle' when the user credentials are correct.
        state.loggedInUserToken = null; // Updates the logged-in user with the user data from the API response.
        
      });
  },
});

// Selectors to access specific parts of the user state
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken; // logged-in user token from the state.
export const selectError = (state) => state.auth.error; // Selects the error from the state.

// export const {  } = counterSlice.actions;

export default counterSlice.reducer;
