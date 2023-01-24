import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startTripdata: false,
};

export const StartTripSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    ActivateStartTrip: (state) => {
      console.log("kaka");
      state.startTripdata = !state.startTripdata;
    },

    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { ActivateStartTrip, increment, decrement, incrementByAmount } =
  StartTripSlice.actions;

export default StartTripSlice.reducer;
