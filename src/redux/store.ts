import { configureStore } from "@reduxjs/toolkit";
import proReducer from "./proSlice";

export const store = configureStore({
  reducer: {
    pro: proReducer,
  },
});
