import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { APP_NAME, APIBASEURL } from "@env";

let userAPi = "https://www.smoothride.ng/taxi/api/login";

const initialState = {
  user: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};

const loginfetchDatahandle = async (userData) => {
  try {
    const response = await axios.post(userAPi, userData);
    await AsyncStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {}
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
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
        state.user = true;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      });
  },
});

export const { reset } = LoginSlice.actions;

export const selectLoginSlice = (state) => state.LoginSlice;
export default LoginSlice.reducer;
