import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { APP_NAME, APIBASEURL } from "@env";

let userAPi = "https://www.smoothride.ng/taxi/api/login";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "why me",
};

const loginfetchDatahandle = async (userData) => {
  // console.log(userData);

  try {
    const response = await axios.post(userAPi, userData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  // console.log(user);
  try {
    return await loginfetchDatahandle(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = LoginSlice.actions;

export const selectLoginSlice = (state) => state.LoginSlice;
export default LoginSlice.reducer;
