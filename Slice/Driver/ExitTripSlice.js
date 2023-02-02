import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

const initialState = {
  ExittripData: null,
  IsError: false,
  IsSucess: false,
  message: "",
  IsLoading: false,
};

const ExitTripService = async (ExitData, tokengot) => {
  try {
    let url = `${SMOOTHRIDE_NEWAPI}exittripwithrider`;

    const config = {
      headers: {
        Authorization: `Bearer ${tokengot}`,
      },
    };

    console.log(url);
    const response = await axios.post(url, ExitData, config);
    console.log({ goal: response.data });
    return response.data;
  } catch (error) {
    console.log({ error: error });
  }
};

export const ExitTripFunc = createAsyncThunk(
  "ExitTrip/data",
  async (Exitid, thunkAPI) => {
    try {
      console.log({ ee: Exitid });
      const tokengot = await AsyncStorage.getItem("token");

      console.log(tokengot);
      return await ExitTripService(Exitid, tokengot);
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

export const ExitTripSlice = createSlice({
  name: "ExitTrip",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(ExitTripFunc.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(ExitTripFunc.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IsSucess = true;
        state.ExittripData = action.payload;
      })
      .addCase(ExitTripFunc.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.message = action.payload;
        state.ExittripData = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = ExitTripSlice.actions;

export default ExitTripSlice.reducer;
