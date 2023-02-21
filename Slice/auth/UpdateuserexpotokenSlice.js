import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  APP_NAME,
  APIBASEURL,
  SMOOTHRIDEAPIURL,
  SMOOTH_RIDE_OLD_API_URL,
} from "@env";

const initialState = {
  ExpotokenObj: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const Updateuserexpotoken_Service = async (usertoken, userdata) => {
  let url = process.env.SMOOTHRIDE_NEWAPI + "updateuserexpotoken";

  console.log({ userdata });

  console.log({ usertoken });

  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
  };

  const response = await axios.put(url, userdata, config);
  console.log(response.data);
  return response.data;
};

export const Updateuserexpotoken_Fun = createAsyncThunk(
  "auth/logout",
  async (userdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().LoginSlice.data.access_token;
      return await Updateuserexpotoken_Service(token, userdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      console.log({ error });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateuserexpotokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.ResetUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(Updateuserexpotoken_Fun.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Updateuserexpotoken_Fun.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ExpotokenObj = action.payload;
      })
      .addCase(Updateuserexpotoken_Fun.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.ExpotokenObj = null;
      });
  },
});

export const { reset } = UpdateuserexpotokenSlice.actions;
export default UpdateuserexpotokenSlice.reducer;
