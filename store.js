import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slice/auth/LoginSlice";
import GetRiderSlice from "./Slice/auth/Getrider";

import navReducer from "./Slice/navSlice";
import PassowrdReset from "./Slice/auth/PassowrdReset";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    LoginSlice: LoginSlice,
    PassowrdReset: PassowrdReset,
    GetRiderSlice: GetRiderSlice,
  },
});
