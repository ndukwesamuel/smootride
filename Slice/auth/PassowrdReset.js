import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  APP_NAME,
  APIBASEURL,
  SMOOTHRIDEAPIURL,
  SMOOTH_RIDE_OLD_API_URL,
} from "@env";

const initialState = {
  ResetUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const ResetpasswordService = async (userData) => {
  let url = process.env.SMOOTHRIDE_NEWAPI + "forgotpassword";
  // console.log(url)

  const response = await axios.post(url, userData);

    // console.log(response.data);
  return response.data;
};

export const PasswordReset_fuc = createAsyncThunk(
  "auth/Resetpassword",
  async (data, thunkAPI) => {
    try {
      return await ResetpasswordService(data);
    } catch (error) {
      console.log("notworking ");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ResetpasswordSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.ResetUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(PasswordReset_fuc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PasswordReset_fuc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ResetUser = action.payload;
      })
      .addCase(PasswordReset_fuc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.ResetUser = null;
      });
  },
});

export const { reset } = ResetpasswordSlice.actions;
export default ResetpasswordSlice.reducer;
