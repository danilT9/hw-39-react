import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice.js";
import slicer from "./slice.js";

export const store = configureStore({
  reducer: {
    contacts: slicer,
    auth: authReducer
  }
})