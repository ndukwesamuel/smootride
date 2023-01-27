import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  riderdata: null,
};

export const HoldTripDataSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetALLStartTrip: (state) => initialState,

    HoldRiderInfoActivated: (state, action) => {
      state.riderdata = action.payload;
    },
  },
});

export const {} = HoldTripDataSlice.actions;

export default HoldTripDataSlice.reducer;
