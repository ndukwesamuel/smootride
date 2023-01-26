import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  riderdata: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const GetLastAssignTripService = async (riderData, token) => {
  let url = SMOOTHRIDE_NEWAPI + "getlastassigntrip";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, config);

  return response.data;
};

export const GetLastAssignTrip = createAsyncThunk(
  "GetLastAssignTrip/data",
  async (_, { rejectWithValue }) => {
    const tokengot = await AsyncStorage.getItem("token");
    const infoneeded = `Bearer ${tokengot}`;
    const instance = axios.create({
      baseURL: process.env.SMOOTHRIDE_NEWAPI,
      timeout: 20000,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: infoneeded,
      },
    });
    return await instance
      .post("getlastassigntrip")
      .then(async (response) => {
        return response.data;
      })

      .catch((err) => {
        let errdata = err.response.data;
        return rejectWithValue(errdata);
        // console.log(err)
      });
  }
);

export const GetLastAssignTripSlice = createSlice({
  name: "GetLastAssignTrip",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetLastAssignTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetLastAssignTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.riderdata = action.payload;
      })
      .addCase(GetLastAssignTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = GetLastAssignTripSlice.actions;
export default GetLastAssignTripSlice.reducer;
