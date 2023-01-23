// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// import { SMOOTHRIDE_NEWAPI } from "@env";

// import { Alert } from "react-native";

// const initialState = {
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
//   accepttripData: null,
// };

// const AcceptTripScrvice = async (AcceptData, tokengot) => {
//   let url = SMOOTHRIDE_NEWAPI + "updatetripstatus";

//   const config = {
//     headers: {
//       Authorization: `Bearer ${tokengot}`,
//     },
//   };

//   const response = await axios.post(url, AcceptData, config);

//   console.log(response.data);

//   //   return response.data;
// };

// export const AcceptTrip = createAsyncThunk(
//   "accepttrip/data",
//   async (AcceptData, thunkAPI) => {
//     try {
//       console.log(AcceptData);
//       const tokengot = await AsyncStorage.getItem("token");

//       return await AcceptTripScrvice(AcceptData, tokengot);
//     } catch (error) {
//       console.log(error);
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const AcceptTripSlice = createSlice({
//   name: "accepttrip",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(AcceptTrip.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(AcceptTrip.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.accepttripData = action.payload;
//       })
//       .addCase(AcceptTrip.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset } = AcceptTripSlice.actions;
// export default AcceptTripSlice.reducer;
