import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  IsError: false,
  AcceptTrip: null,
  IsSucess: false,
  message: "",
  IsLoading: false,
};

const AcceptTripScrvice = async (AcceptData, tokengot) => {
  let url = SMOOTHRIDE_NEWAPI + "updatetripstatus";

  const config = {
    headers: {
      Authorization: `Bearer ${tokengot}`,
    },
  };

  const response = await axios.post(url, AcceptData, config);
  return response.data;
};

export const AcceptTripFun = createAsyncThunk(
  "accepttrip/data",
  async (AcceptData, thunkAPI) => {
    try {
      console.log(AcceptData);
      const tokengot = await AsyncStorage.getItem("token");

      return await AcceptTripScrvice(AcceptData, tokengot);
    } catch (error) {
      console.log(error);
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

export const DriverAcceptTripSlice = createSlice({
  name: "acceptdriverTrip",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(AcceptTripFun.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(AcceptTripFun.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IsSucess = true;
        state.AcceptTrip = action.payload;
      })
      .addCase(AcceptTripFun.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.message = action.payload;
        state.AcceptTrip = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = DriverAcceptTripSlice.actions;

export default DriverAcceptTripSlice.reducer;
