import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  rejectData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const RejectTripService = async (rejectdatainfo, tokengot) => {
  let url = SMOOTHRIDE_NEWAPI + "driverdeclinetrip";

  console.log(rejectdatainfo);

  const config = {
    headers: {
      Authorization: `Bearer ${tokengot}`,
    },
  };

  const response = await axios.post(url, rejectdatainfo, config);
  console.log(response.data);
  return response.data;
};

export const RejectTrip = createAsyncThunk(
  "RejectTrip/data",
  async (rejectdatainfo, thunkAPI) => {
    try {
      const tokengot = await AsyncStorage.getItem("token");

      return await RejectTripService(rejectdatainfo, tokengot);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RejectTripSlice = createSlice({
  name: "RejectTrip",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(RejectTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RejectTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rejectData = action.payload;
      })
      .addCase(RejectTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = RejectTripSlice.actions;
export default RejectTripSlice.reducer;
