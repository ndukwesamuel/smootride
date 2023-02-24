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
  LogoutData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const logout_Service = async (usertoken) => {
  let url = process.env.SMOOTHRIDE_NEWAPI + "logout";

  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
  };

  const response = await axios.get(url, config);
  console.log(response.data);
  return response.data;
};

export const Logout_fuc = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().LoginSlice.data.access_token;
      return await logout_Service(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      console.log({ error });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const LogoutSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(Logout_fuc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout_fuc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.LogoutData = action.payload;
      })
      .addCase(Logout_fuc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.LogoutData = null;
      });
  },
});

export const { reset } = LogoutSlice.actions;
export default LogoutSlice.reducer;
