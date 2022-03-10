import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
