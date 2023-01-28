import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  holdriderdata: null,
};

export const HoldTripDataSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetholdriderdata: (state) => initialState,

    HoldRiderInfoActivated: (state, action) => {
      state.holdriderdata = action.payload;
    },
  },
});

export const { HoldRiderInfoActivated, resetholdriderdata } =
  HoldTripDataSlice.actions;

export default HoldTripDataSlice.reducer;
