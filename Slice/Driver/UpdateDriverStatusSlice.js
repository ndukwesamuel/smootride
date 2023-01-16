import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  drivestatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const ResetpasswordService = async (userData, tokengot) => {
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
export const UpdateDriverStatus = createAsyncThunk(
  "updateStatus/data",
  async (statusData, thunkAPI) => {
    try {
      const tokengot = await AsyncStorage.getItem("token");
      return await ResetpasswordService(statusData, tokengot);
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

export const UpdateDriverStatusSlice = createSlice({
  name: "updateStatus",
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

export const { reset } = UpdateDriverStatusSlice.actions;
export default UpdateDriverStatusSlice.reducer;
