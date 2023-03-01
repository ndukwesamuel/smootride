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
  totalpointData: [],
  Google_Distance_Matrix_API: null,
  Networkdata: false,
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

    NetworkFun: (state, action) => {
      state.Networkdata = action.payload;
    },

    MapLocationActivated: (state, action) => {
      state.maplocationdata = action.payload;
    },

    Google_Distance_Matrix_API_FUN: (state, action) => {
      state.Google_Distance_Matrix_API = action.payload;
    },

    PickUpAddressFun: (state, action) => {
      state.pickUpAddressData = action.payload;
    },

    DestAddressDataFun: (state, action) => {
      state.destAddressData = action.payload;
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

    TotalpointActivated: (state, action) => {
      state.totalpointData.push(action.payload);
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
  PickUpAddressFun,
  DestAddressDataFun,
  TotalpointActivated,
  Google_Distance_Matrix_API_FUN,
  NetworkFun,
} = StartTripSlice.actions;

export default StartTripSlice.reducer;
