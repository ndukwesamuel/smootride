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

   export const LastAssignedDriver= createAsyncThunk(
    "lastassignedDriver/Driverassignedlast", async(requestdetails, {rejectWithValue})=>{
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
            .post("getassigneddriver", requestdetails)
            .then( async (response) => {
              // console.log("last assigned response ",response.data)
              return response.data;
            })
             
      .catch((err) =>{ 
        let errdata = err.response.data;
        Alert.alert(errdata?.message)
        // console.log("request error ",errdata)
      return rejectWithValue(err.response.data)
    })
        
    }
  )

  export const AssignedDriver= createAsyncThunk(
    "assignedDriver/Driverassigned", async(requestdetails, {rejectWithValue})=>{
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
            .post("getassigneddriver", requestdetails)
            .then( async (response) => {
              // console.log("assigned response ",response.data)
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


  export const TripStatus= createAsyncThunk(
    "TripStatus/Statustrip", async(id, {rejectWithValue})=>{
      // console.log("trip id ",id)
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
            .get(`getdriverstate/${id}`)
            .then( async (response) => {
              console.log("driver status response ",response.data)
              return response.data;
            })
             
      .catch((err) =>{ 
        let errdata = err.response.data;
        
      return rejectWithValue(err.response.data)
    })
        
    }
  )
  

  export const KnowTrip= createAsyncThunk(
    "KnowTrip/tripstat", async(id, {rejectWithValue})=>{
      // console.log("trip id ",id)
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
            .get(`gettripstatus/${id}`)
            .then( async (response) => {
              // console.log("Know Trip response ",response.data)
              if(response.data?.success == false ){
                // Alert.alert("Trip rejected");
              }
              return response.data;
            })
             
      .catch((err) =>{ 
        let errdata = err.response.data;
        
      return rejectWithValue(err.response.data)
    })
        
    }
  )
  

  export const CancelRequest= createAsyncThunk(
    "cancelreq/reqcancelled", async(_, {rejectWithValue})=>{
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
            .post("canceltrip")
            .then( async (response) => {
              // console.log("cancelled response ",response.data)
              Alert.alert("Trip cancelled")
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
    isRequest: false,
    assignedDriver: null,
    RequestData: null,
    Lastassigned: null,
    tripStatus: null,
    KnowTrip: null,
    rejectedTrip: false,
  };

  // export const CloseReject= (state, action) =>{
  //   // if (action.type === "REJECT"){
  //   //   state.rejectedTrip = false;
  //   // }
  //   state.rejectedTrip = false;
  // }

  export const RequestRideSlice = createSlice({
    name: "getRiderreducer",
    initialState,
    reducers: {
      reset: (state) => initialState,
      CloseReject: (state) =>{          
          state.rejectedTrip = false;
          console.log("rejected lets see ", state.rejectedTrip)
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(RequestRide.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(RequestRide.fulfilled, (state, action) => {
          // Alert.alert("Trip requested")
          state.isLoading = false;
          state.isSuccess = true;
          state.data= null;
          state.user = true;
          state.isRequest= true;
          state.RequestData= action.payload;
        })
        .addCase(RequestRide.rejected, (state, action) => {
          // console.log("rejected values ",action.payload)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = false;
        })
        .addCase(CancelRequest.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(CancelRequest.fulfilled, (state, action) => {
          // Alert.alert("Trip requested")
          state.tripStatus= null;
          state.assignedDriver= null;
          state.RequestData= null;
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.isRequest= false;
          state.data= action.payload;
          state.Lastassigned = null;
        })
        .addCase(CancelRequest.rejected, (state, action) => {
          // console.log("rejected values ",action.payload)
          state.tripStatus= null;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = false;
        })
        .addCase(AssignedDriver.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(AssignedDriver.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.assignedDriver= action.payload;
        })
        .addCase(AssignedDriver.rejected, (state, action) => {
          // console.log("rejected values ",action.payload)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(LastAssignedDriver.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(LastAssignedDriver.fulfilled, (state, action) => {
          // console.log("actions ", action.payload)
          if(action.payload?.data == null){
            state.isRequest= false;
            }
          state.isLoading = false;
          state.isSuccess = true;
          state.Lastassigned= action.payload;
          
        })
        .addCase(LastAssignedDriver.rejected, (state, action) => {
          // console.log("rejected values ",action.payload)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(TripStatus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(TripStatus.fulfilled, (state, action) => {
          if(action.payload?.status == null){
            state.isRequest= false;
            state.assignedDriver= null;
            state.tripStatus= null;
            state.RequestData = null;
            // console.log("got here")
          }else{            
          state.tripStatus= action.payload;
          }
          state.isLoading = false;
          state.isSuccess = true;
          // console.log("state is", action.payload);
        })
        .addCase(TripStatus.rejected, (state, action) => {          
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(KnowTrip.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(KnowTrip.fulfilled, (state, action) => {
          if(action.payload?.success == false ){
            state.rejectedTrip= true;
            state.tripStatus= null;
            state.assignedDriver= null;
            state.RequestData= null;
            state.isRequest= false;
            state.Lastassigned= null;
          }
          state.KnowTrip= action.payload;
          state.isLoading = false;
          state.isSuccess = true;
          // console.log("state is", state.RequestData?.data?.id);
        })
        .addCase(KnowTrip.rejected, (state, action) => {          
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
    },
  });

  export const { reset, CloseReject } = RequestRideSlice.actions;
  export default RequestRideSlice.reducer;