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
  IsLoading: "",
};

const ExitTripService = async (ExitData, Exitid, tokengot) => {
  // let url = SMOOTHRIDE_NEWAPI + "getlastassigntrip";

  // updatetripcompleted
  //   let url = `${SMOOTHRIDE_NEWAPI}getlastassigntrip/${Exitid}`;

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${tokengot}`,
  //     },
  //   };

  //   console.log("what happen");

  //   const response = await axios.post(url, ExitData, config);
  //   console.log(response.data);

  try {
    let url = `${SMOOTHRIDE_NEWAPI}updatetripcompleted/${Exitid}`;

    const config = {
      headers: {
        Authorization: `Bearer ${tokengot}`,
      },
    };

    console.log(url);
    const response = await axios.post(url, ExitData, config);
    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.log(error);

    // console.log("we loss");
  }
  //   return response.data;
};

export const ExitTripFunc = createAsyncThunk(
  "ExitTrip/data",
  async (ExitData, thunkAPI) => {
    try {
      let Exitid = 17400;

      const tokengot = await AsyncStorage.getItem("token");
      return await ExitTripService(ExitData, Exitid, tokengot);
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
        state.AcceptTrip = action.payload;
      })
      .addCase(ExitTripFunc.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.message = action.payload;
        state.AcceptTrip = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = ExitTripSlice.actions;

export default ExitTripSlice.reducer;
