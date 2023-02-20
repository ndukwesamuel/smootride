import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetRider = createAsyncThunk(
  "rider/getRider",
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
      .get("listofdrivers")
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

export const GetTrips = createAsyncThunk(
  "getridertrips/Ridertrips",
  async (_, { rejectWithValue }) => {
    const tokengot = await AsyncStorage.getItem("token");
    const infoneeded = `Bearer ${tokengot}`;
    const instance = axios.create({
      baseURL: process.env.SMOOTHRIDE_NEWAPI,
      timeout: 30000,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: infoneeded,
      },
    });
    return await instance
      .get("getridertrip")
      .then(async (response) => {
        // console.warn("trip info ", response.data);
        return response.data;
      })

      .catch((err) => {
        let errdata = err.response.data;
        // console.warn("trip error ", err.response.data);
        return rejectWithValue(errdata);
        // console.log(err)
      });
  }
);

export const GetAddress = createAsyncThunk(
  "getaddress/Addressesgotten",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    const tokengot = await AsyncStorage.getItem("token");
    const infoneeded = `Bearer ${tokengot}`;
    const instance = axios.create({
      baseURL: `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${process.env.GOOGLE_ADDRESS_APIKEY}`,
      timeout: 30000,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: infoneeded,
      },
    });
    return await instance
      .get("")
      .then(async (response) => {
        console.log("Addresses info ", response.data?.results[0]?.formatted_address);
        return response.data?.results[0]?.formatted_address;
      })

      .catch((err) => {
        let errdata = err.response.data;
        // console.warn("trip error ", err.response.data);
        return rejectWithValue(errdata);
      });
  }
);

const initialState = {
  user: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
  trips: null,
  address: null,
};

export const GetRiderSlice = createSlice({
  name: "getRiderreducer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetRider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetRider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.data = action.payload;
      })
      .addCase(GetRider.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      })
      .addCase(GetAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.address = action.payload;
      })
      .addCase(GetAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      })
      .addCase(GetTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTrips.fulfilled, (state, action) => {
        // console.log("trips logs stored ",action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.trips = action.payload;
      })
      .addCase(GetTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      });
  },
});

export const { reset } = GetRiderSlice.actions;
export default GetRiderSlice.reducer;
