import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  First_Trip_start_time: null,
};

export const FristTripSlice = createSlice({
  name: "firsttrip",
  initialState,
  reducers: {
    resetALLFristTripSlice: (state) => initialState,

    First_Trip_StartTime_Activated: (state, action) => {
      state.First_Trip_start_time = action.payload;
    },
  },
});

export const { resetALLFristTripSlice, First_Trip_StartTime_Activated } =
  FristTripSlice.actions;

export default FristTripSlice.reducer;
