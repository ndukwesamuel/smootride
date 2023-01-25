import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startTripdata: false,
  maplocationdata: true,
  currentLocationData: null,
  startTimecurrentLocationData: "",
  LastDestinationLocationData: null,
  EndTimeLastDestinationLocationData: "",
  completedTripdata: null,
};

export const StartTripSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    ActivateStartTrip: (state) => {
      console.log("kaka");
      state.startTripdata = !state.startTripdata;
    },

    MapLocationActivated: (state, action) => {
      state.maplocationdata = action.payload;
    },

    CurrentLocationActivated: (state, action) => {
      state.currentLocationData = action.payload;
    },

    LastDestinationLocationActivated: (state, action) => {
      state.LastDestinationLocationData = action.payload;
    },

    StartTimeCurrentLocationActivated: (state, action) => {
      state.startTimecurrentLocationData = action.payload;
    },

    EndTimeLastDestinationLocationActivated: (state, action) => {
      state.EndTimeLastDestinationLocationData = action.payload;
    },

    CompletedTripActivated: (state, action) => {
      state.completedTripdata = action.payload;
    },
  },
});

export const {
  ActivateStartTrip,
  MapLocationActivated,
  CurrentLocationActivated,
  LastDestinationLocationActivated,
  StartTimeCurrentLocationActivated,
  EndTimeLastDestinationLocationActivated,
  CompletedTripActivated,
} = StartTripSlice.actions;

export default StartTripSlice.reducer;
