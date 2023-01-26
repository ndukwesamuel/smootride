import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

Alert;
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
  if (response.data.message == "No driver" && response.data.success == false) {
    console.log("we need to do something");
    Alert.alert(
      "Alert",
      `${response.data.message} available If you must cancel, click Reject.`,
      [{ text: "OK" }],
      { cancelable: false }
    );
  } else {
    return response.data;
  }
};

export const RejectTrip = createAsyncThunk(
  "RejectTrip/data",
  async (rejectdatainfo, thunkAPI) => {
    try {
      console.log(rejectdatainfo);
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
