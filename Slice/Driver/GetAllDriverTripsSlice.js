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

const GetAllDriverTripsService = async (userData, tokengot) => {
  let url = SMOOTHRIDE_NEWAPI + "updatedriverstatus";

  console.log(url);
  console.log(tokengot);
  console.log(userData);

  const config = {
    headers: {
      Authorization: `Bearer ${tokengot}`,
    },
  };

  const response = await axios.post(url, userData, config);

  console.log(response.data);
  return response.data;
};

// Get user goals
export const GetAllDriverTrips = createAsyncThunk(
  "getalldriveTrips/data",
  async (statusData, thunkAPI) => {
    try {
      const tokengot = await AsyncStorage.getItem("token");
      return await GetAllDriverTripsService(statusData, tokengot);
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
      .addCase(UpdateDriverStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateDriverStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.drivestatus = action.payload;
      })
      .addCase(UpdateDriverStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = GetAllDriverTripsSlice.actions;
export default GetAllDriverTripsSlice.reducer;
