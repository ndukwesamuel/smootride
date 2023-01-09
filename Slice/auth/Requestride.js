import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const RequestRide= createAsyncThunk(
    "details/postdetail", async(requestdetails, {rejectWithValue})=>{
      console.log(requestdetails)
        const tokengot = await  AsyncStorage.getItem("token")
        const infoneeded= `Bearer ${tokengot}`
        const instance = axios.create({
            baseURL: "https://www.smoothride.ng/taxi/api/",
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
              console.log(response.data)
              return response.data;
            })
             
      .catch((err) =>{ 
        let errdata = err.response.data;
      return rejectWithValue(errdata)
        // console.log(err)
    })
        
    }
  )
  

  const initialState = {
    user: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    data: null
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
          
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.data= action.payload;
        })
        .addCase(RequestRide.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = false;
        })
    },
  });

  export default RequestRideSlice.reducer;