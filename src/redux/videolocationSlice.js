import {
  videolocationsCallWs,
  currentUserVideolocationsWs,
  videolocationDetailsWs,
} from "../services/videolocation-ws";
import { createSlice } from "@reduxjs/toolkit";

export const videolocationSlice = createSlice({
  name: "videolocation",
  initialState: {
    errorMessage: undefined,
    successMessage: undefined,
    videolocations: null,
    currentUserVideolocations: null,
    videolocationDetails: null,
    videolocationToEdit: null,
  },
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = undefined;
    },
    videolocationsSuccess: (state, action) => {
      state.videolocations = action.payload;
    },
    setCurrentUserVideolocations: (state, action) => {
      state.currentUserVideolocations = action.payload;
    },
    clearCurrentUserVideolocations: (state) => {
      state.currentUserVideolocations = null;
    },
    setVideolocationDetails: (state, action) => {
      state.videolocationDetails = action.payload;
    },
  },
});

export const {
  setError,
  clearError,
  videolocationsSuccess,
  setCurrentUserVideolocations,
  clearCurrentUserVideolocations,
  setVideolocationDetails,
} = videolocationSlice.actions;

export const videolocationsCall = () => async (dispatch) => {
  try {
    const res = await videolocationsCallWs();
    const { data, errorMessage, status } = res;
    return status
      ? dispatch(videolocationsSuccess(data))
      : dispatch(setError(errorMessage));
  } catch (error) {
    return dispatch(setError(error));
  }
};

export const currentUserVideolocationCall = (user) => async (dispatch) => {
  try {
    const res = await currentUserVideolocationsWs(user);
    const { data, errorMessage, status } = res;
    return status
      ? dispatch(setCurrentUserVideolocations(data))
      : dispatch(setError(errorMessage));
  } catch (error) {
    return dispatch(setError(error));
  }
};

export const videolocationDetailsProcess = (_id) => async (dispatch) => {
  try {
    const res = await videolocationDetailsWs({ _id });
    const { data, errorMessage, status } = res;
    return status
      ? dispatch(setVideolocationDetails(data.dbLocation))
      : dispatch(setError(errorMessage));
  } catch (error) {
    return dispatch(setError(error));
  }
};

export default videolocationSlice.reducer;
