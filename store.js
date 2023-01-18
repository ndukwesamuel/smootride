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
import UpdateDriverStatusSlice from "./Slice/Driver/UpdateDriverStatusSlice";
import { combineReducers } from "redux";

import GetlastassigntripSlice from "./Slice/Driver/GetlastassigntripSlice";
import GetAllDriverTripsSlice from "./Slice/Driver/GetAllDriverTripsSlice";

const reducers = combineReducers({
  nav: navReducer,
  LoginSlice: LoginSlice,
  PassowrdReset: PassowrdReset,
  GetRiderSlice: GetRiderSlice,
  UpdateDriverStatusSlice: UpdateDriverStatusSlice,
  GetlastassigntripSlice: GetlastassigntripSlice,
  GetAllDriverTripsSlice: GetAllDriverTripsSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
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
