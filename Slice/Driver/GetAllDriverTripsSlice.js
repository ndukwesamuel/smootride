import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  drivertrip: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const GetAllDriverTripsService = async (token) => {
  let url = SMOOTHRIDE_NEWAPI + "getdrivertrip";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response.data;
};

// Get user goals
export const GetAllDriverTrips = createAsyncThunk(
  "getalldriveTrips/data",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().LoginSlice.data?.access_token;
      return await GetAllDriverTripsService(token);
    } catch (error) {
      console.log(error);
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

export const GetAllDriverTripsSlice = createSlice({
  name: "getalldriveTrips",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllDriverTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllDriverTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.drivertrip = action.payload;
      })
      .addCase(GetAllDriverTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = GetAllDriverTripsSlice.actions;
export default GetAllDriverTripsSlice.reducer;
