// import { configureStore } from "@reduxjs/toolkit";
// import LoginSlice from "./Slice/auth/LoginSlice";
// import GetRiderSlice from "./Slice/auth/Getrider";

// import navReducer from "./Slice/navSlice";
// import PassowrdReset from "./Slice/auth/PassowrdReset";

// export const store = configureStore({
//   reducer: {
//     nav: navReducer,
//     LoginSlice: LoginSlice,
//     PassowrdReset: PassowrdReset,
//     GetRiderSlice: GetRiderSlice,
//   },
// });

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import LoginSlice from "./Slice/auth/LoginSlice";
import GetRiderSlice from "./Slice/auth/Getrider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import navReducer from "./Slice/navSlice";
import PassowrdReset from "./Slice/auth/PassowrdReset";
import GetLastAssignTripSlice from "./Slice/Driver/GetLastAssignTripSlice";
import UpdateDriverStatusSlice from "./Slice/Driver/UpdateDriverStatusSlice";
import { combineReducers } from "redux";

import RejectTripSlice from "./Slice/Driver/RejectTripSlice";

import GetAllDriverTripsSlice from "./Slice/Driver/GetAllDriverTripsSlice";
import RequestRideSlice from "./Slice/auth/Requestride";

import DriverAcceptTripSlice from "./Slice/Driver/DriverAcceptTripSlice";

import StartTripSlice from "./Slice/Driver/StartTripSlice";

import ExitTripSlic from "./Slice/Driver/ExitTripSlice";

import CompleteDriverTripSlice from "./Slice/Driver/CompleteDriverTripSlice";

const reducers = combineReducers({
  nav: navReducer,
  LoginSlice: LoginSlice,
  PassowrdReset: PassowrdReset,
  GetRiderSlice: GetRiderSlice,
  RequestRideSlice: RequestRideSlice,
  UpdateDriverStatusSlice: UpdateDriverStatusSlice,
  GetAllDriverTripsSlice: GetAllDriverTripsSlice,
  GetLastAssignTripSlice: GetLastAssignTripSlice,
  RejectTripSlice: RejectTripSlice,
  DriverAcceptTripSlice: DriverAcceptTripSlice,

  StartTripSlice: StartTripSlice,

  ExitTripSlic: ExitTripSlic,
  CompleteDriverTripSlice: CompleteDriverTripSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [
    "GetLastAssignTripSlice",
    "RejectTripSlice",
    "CompleteDriverTripSlice",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
