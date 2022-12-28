import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const GetTrip= createAsyncThunk(
//     "tripsgone/tripsdone", async(_, {rejectWithValue})=>{
//         const tokengot= await AsyncStorage.getItem("token")
        
//         const infoneeded= `Bearer ${tokengot}`
//         const instance = axios.create({
//             baseURL: "https://www.smoothride.ng/taxi/api/",
//             timeout: 20000,
//             headers: {
//                 "Content-Type":"application/json",
//                 "Accept": "application/json",
//                 "Authorization": infoneeded
//             }
//         })

//         return await instance.get("getridertrip")
//         .then(async (response)=> {
//             console.log("routes passed ",response.data)
//             return await response.data
//         })
//         .catch(err => console.log(err))
//     }
// )

export const GetTrip= createAsyncThunk(
    "tripsgone/tripsdone", async(_, {rejectWithValue})=>{
        const tokengot = await  AsyncStorage.getItem("token")
        const infoneeded= `Bearer ${tokengot}`
        console.log("token works")
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
            .get("getridertrip")
            .then( async (response) => {
              console.warn("route passed  ", response.data);
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
    name: "getTripreducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(GetTrip.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(GetTrip.fulfilled, (state, action) => {
          
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.data= action.payload;
          console.warn("data stored ",action.payload);
        })
        .addCase(GetTrip.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = false;
        });
    },
  });
