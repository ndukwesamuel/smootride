import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";
import { useSelector } from "react-redux";

const initialState = {
  CompleteDriverTripData: null,
  IsError: false,
  IsSucess: false,
  message: "",
  IsLoading: false,
};

const CompleteDriverTripService = async (Completdata, Exitid, tokengot) => {
  try {
    let url = `${SMOOTHRIDE_NEWAPI}updatetripcompleted/${Exitid}`;

    const config = {
      headers: {
        Authorization: `Bearer ${tokengot}`,
      },
    };

    console.log(url);
    const response = await axios.post(url, Completdata, config);
    console.log({ CompleteDriverTripService: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CompleteDriverTripFunc = createAsyncThunk(
  "CompleteDriverTrip/data",
  async (Completdata, thunkAPI) => {
    try {
      const Exitid =
        thunkAPI.getState().HoldTripDataSlice.holdriderdata.data.id;

      const tokengot = await AsyncStorage.getItem("token");
      return await CompleteDriverTripService(Completdata, Exitid, tokengot);
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

export const CompleteDriverTripSlice = createSlice({
  name: "CompleteDriverTrip",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(CompleteDriverTripFunc.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(CompleteDriverTripFunc.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IsSucess = true;
        state.CompleteDriverTripData = action.payload;
      })
      .addCase(CompleteDriverTripFunc.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.message = action.payload;
        state.CompleteDriverTripData = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = CompleteDriverTripSlice.actions;

export default CompleteDriverTripSlice.reducer;
