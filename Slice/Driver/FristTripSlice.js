import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  First_Trip_start_time: null,
  First_Trip_Location: null,
};

export const FristTripSlice = createSlice({
  name: "firsttrip",
  initialState,
  reducers: {
    resetALLFristTripSlice: (state) => initialState,

    First_Trip_StartTime_Activated: (state, action) => {
      state.First_Trip_start_time = action.payload;
    },

    First_Trip_Location_Activated: (state, action) => {
      state.First_Trip_Location = action.payload;
    },
  },
});

export const {
  First_Trip_Location_Activated,
  resetALLFristTripSlice,
  First_Trip_StartTime_Activated,
} = FristTripSlice.actions;

export default FristTripSlice.reducer;
