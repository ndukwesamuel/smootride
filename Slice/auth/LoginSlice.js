import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  APP_NAME,
  APIBASEURL,
  SMOOTHRIDEAPIURL,
  SMOOTH_RIDE_OLD_API_URL,
} from "@env";
import { Alert } from "react-native";

let userAPi = process.env.SMOOTHRIDE_NEWAPI + "login";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  data: null,
};

const loginfetchDatahandle = async (userData) => {
  try {
    const response = await axios.post(userAPi, userData);
    if (response.data) {
      // console.warn("login data ", response.data)

      if (userData.rememberMe) {
        console.log({ userData });
        let data = JSON.stringify(userData);
        await AsyncStorage.setItem("rememberData", data);
      }
      await AsyncStorage.setItem("token", response.data.access_token);
      await AsyncStorage.setItem("userdata", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    if (error.response.data.message) {
      Alert.alert("Username and Password does not Match");
    }
  }
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await loginfetchDatahandle(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        console.log({ thisis: action });
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      });
  },
});

export const { reset } = LoginSlice.actions;

export const selectLoginSlice = (state) => state.LoginSlice;
export default LoginSlice.reducer;
