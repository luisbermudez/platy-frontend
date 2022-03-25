import { logoutWs, authVerifyWs } from "../services/auth-ws";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    errorMessage: undefined,
    successMessage: undefined,
    user: null,
  },
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    setAuthorized: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setUnauthorized: (state, action) => {
      state.isLoggedIn = false;
      state.errorMessage = action.payload;
      state.user = null;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logoutFail: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setError,
  setAuthorized,
  setUnauthorized,
  logoutSuccess,
  logoutFail,
} = authSlice.actions;

export const authVerify = () => async (dispatch) => {
  try {
    const res = await authVerifyWs();
    const { data, errorMessage, status } = res;
    return status
      ? dispatch(setAuthorized(data.user))
      : dispatch(setUnauthorized(errorMessage));
  } catch (error) {
    return dispatch(setUnauthorized(error));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await logoutWs();
    const { status, errorMessage } = res;
    status ? dispatch(logoutSuccess()) : dispatch(logoutFail(errorMessage));
  } catch (error) {
    return dispatch(logoutFail(error));
  }
};

export default authSlice.reducer;
