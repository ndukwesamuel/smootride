import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startTripdata: false,
  maplocationdata: true,
  currentLocationData: null,
  startTimecurrentLocationData: "",
  LastDestinationLocationData: null,
  EndTimeLastDestinationLocationData: "",
  completedTripdata: null,
  totalTripAmount: null,
  total_distance_covered: 0,

  pickUpAddressData: null,
  destAddressData: null,
};

export const StartTripSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetALLStartTrip: (state) => initialState,

    resetAll_Excerpt_startTripdata: (state) => {
      state.maplocationdata = true;
      state.currentLocationData = null;
      state.startTimecurrentLocationData = "";
      state.LastDestinationLocationData = null;
      state.EndTimeLastDestinationLocationData = "";
      state.completedTripdata = null;
    },

    ActivateStartTrip: (state) => {
      state.startTripdata = !state.startTripdata;
    },

    MapLocationActivated: (state, action) => {
      state.maplocationdata = action.payload;
    },

    TotalTripAmountFun: (state, action) => {
      state.totalTripAmount = action.payload;
    },

    TotalTripAmountFun: (state, action) => {
      state.totalTripAmount = action.payload;
    },

    CurrentLocationActivated: (state, action) => {
      state.currentLocationData = action.payload;
    },

    TotalDistanceCoveredFun: (state, action) => {
      state.total_distance_covered = action.payload;
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
  resetAll_Excerpt_startTripdata,
  resetALLStartTrip,
  TotalTripAmountFun,
  TotalDistanceCoveredFun,
} = StartTripSlice.actions;

export default StartTripSlice.reducer;
