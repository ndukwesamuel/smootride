import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const RequestRide= createAsyncThunk(
    "details/postdetail", async(requestdetails, {rejectWithValue})=>{
      // console.log(requestdetails)
        const tokengot = await  AsyncStorage.getItem("token")
        const infoneeded= `Bearer ${tokengot}`
        const instance = axios.create({
            baseURL: process.env.SMOOTHRIDE_NEWAPI,
            timeout: 20000,
      
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": infoneeded
            },
          });
          return await instance
            .post("requestride", requestdetails)
            .then( async (response) => {
              // console.log("requested response ",response.data)
              return response.data;
            })
             
      .catch((err) =>{ 
        let errdata = err.response.data;
        if (errdata?.message== "No Driver Available"){
          Alert.alert(errdata?.message)
        }else{
          Alert.alert(errdata?.message)
        }
        // console.log("request error ",errdata)
      return rejectWithValue(err.response.data)
    })
        
    }
  )
  

  const initialState = {
    user: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    data: null,
    isRequest: false
  };

  export const RequestRideSlice = createSlice({
    name: "getRiderreducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(RequestRide.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(RequestRide.fulfilled, (state, action) => {
          Alert.alert("Trip requested")
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.data= action.payload;
        })
        .addCase(RequestRide.rejected, (state, action) => {
          console.log("rejected values ",action.payload)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = false;
          state.isRequest= false;
        })
    },
  });

  export default RequestRideSlice.reducer;