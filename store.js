import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slice/auth/LoginSlice";

import navReducer from "./Slice/navSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    LoginSlice: LoginSlice,
  },
});
