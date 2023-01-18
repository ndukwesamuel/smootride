import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  rider: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const GetlastassigntripService = async (rider_data, token) => {
  let url = SMOOTHRIDE_NEWAPI + "getlastassigntrip";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(token);

  // console.log(rider_data);

  // console.log("jsjs");

  const response = await axios.post(url, rider_data, config);
  return response.data;
};

export const Getlastassigntrip = createAsyncThunk(
  "Getlastassigntrip/rider",
  async (rider_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().LoginSlice.data?.access_token;
      return await GetlastassigntripService(rider_data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetlastassigntripSlice = createSlice({
  name: "Getlastassigntrip",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.rider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Getlastassigntrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getlastassigntrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rider = action.payload;
      })
      .addCase(Getlastassigntrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = GetlastassigntripSlice.actions;

export default GetlastassigntripSlice.reducer;
