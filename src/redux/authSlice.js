import { logoutWs, authVerifyWs } from "../services/auth-ws";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    errorMessage: null,
    successMessage: undefined,
    user: null,
    authenticated: false,
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
    setAuthenticated: (state) => {
      state.authenticated = true;
    },
  },
});

export const {
  setError,
  setAuthorized,
  setUnauthorized,
  logoutSuccess,
  logoutFail,
  setAuthenticated,
} = authSlice.actions;

export const authVerify = () => async (dispatch) => {
  try {
    const res = await authVerifyWs();
    const { data, errorMessage, status } = res;

    if (status) {
      await dispatch(setAuthorized(data.user));
    } else {
      await dispatch(setUnauthorized(errorMessage));
    }
    dispatch(setAuthenticated());
    return;
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
