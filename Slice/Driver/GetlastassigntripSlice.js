import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  riderdata: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const GetLastAssignTripService = async (riderData, token) => {
  let url = SMOOTHRIDE_NEWAPI + "getassigneddriver";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, riderData, config);
  return response.data;
};

// Get user goals
export const GetLastAssignTrip = createAsyncThunk(
  "GetLastAssignTrip/data",
  async (riderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().LoginSlice.data?.access_token;
      return await GetLastAssignTripService(riderData, token);
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

export const GetLastAssignTripSlice = createSlice({
  name: "GetLastAssignTrip",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetLastAssignTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetLastAssignTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rider = action.payload;
      })
      .addCase(GetLastAssignTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = GetLastAssignTripSlice.actions;
export default GetLastAssignTripSlice.reducer;
