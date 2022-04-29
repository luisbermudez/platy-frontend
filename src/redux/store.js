import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import videolocationSlice from "./videolocationSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    videolocation: videolocationSlice,
  },
});
