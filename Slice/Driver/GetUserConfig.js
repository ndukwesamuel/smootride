import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { SMOOTHRIDE_NEWAPI } from "@env";

import { Alert } from "react-native";

const initialState = {
  IsError: false,
  getuserDATA: null,
  IsSucess: false,
  message: "",
  IsLoading: false,
};

const GetUserConfigScrvice = async (userdata, tokengot) => {
  let url = `${SMOOTHRIDE_NEWAPI}getuserwithconfig/${userdata}`;

  const config = {
    headers: {
      Authorization: `Bearer ${tokengot}`,
    },
  };

  const response = await axios.post(url, "", config);

  return response.data;
};

export const GetUserConfigFun = createAsyncThunk(
  "getuserconfig/data",
  async (userdata, thunkAPI) => {
    try {
      console.log("working ");

      console.log(userdata.data.staffId);
      const tokengot = await AsyncStorage.getItem("token");

      return await GetUserConfigScrvice(userdata.data.staffId, tokengot);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log({ message });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetUserConfigSlice = createSlice({
  name: "getuserconfig",
  initialState,
  reducers: {
    GetUserConfigreset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(GetUserConfigFun.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(GetUserConfigFun.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IsSucess = true;
        state.getuserDATA = action.payload;
      })
      .addCase(GetUserConfigFun.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.message = action.payload;
        state.getuserDATA = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { GetUserConfigreset } = GetUserConfigSlice.actions;

export default GetUserConfigSlice.reducer;
