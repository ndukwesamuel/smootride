import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetRider= createAsyncThunk(
    "rider/getRider", async(_, {rejectWithValue})=>{
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
            .get("listofdrivers")
            .then( async (response) => {
              return response.data;
            })
             
      .catch(err => console.log(err))
        
    }
)

const initialState = {
    user: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    data: null
  };

  export const GetRiderSlice = createSlice({
    name: "getRiderreducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(GetRider.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(GetRider.fulfilled, (state, action) => {
          
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.data= action.payload;
        })
        .addCase(GetRider.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = false;
        });
    },
  });

  export default GetRiderSlice.reducer;