import {
  videolocationsCallWs,
  currentUserVideolocationsWs,
  videolocationDetailsWs,
  videolocationDeleteWs,
} from "../services/videolocation-ws";
import { createSlice } from "@reduxjs/toolkit";

export const videolocationSlice = createSlice({
  name: "videolocation",
  initialState: {
    errorMessage: undefined,
    successMessage: undefined,
    videolocations: [],
    currentUserVideolocations: null,
    videolocationDetails: null,
    videolocationToEdit: null,
    isSearchbarActive: false,
    coordinates: null,
    videoForNewPost: null,
    postLocation: null,
    editingLocation: false,
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
    deleteVideolocation: (state, action) => {
      const videolocation = state.videolocations;
      const updatedVideolocations = videolocation.filter(
        (item) => item._id !== action.payload._id
      );
      state.videolocations = updatedVideolocations;
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
    clearVideolocationDetails: (state) => {
      state.videolocationDetails = null;
    },
    toggleSearchbar: (state) => {
      state.isSearchbarActive = !state.isSearchbarActive;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    clearCoordinates: (state) => {
      state.coordinates = null;
    },
    setVideoForNewPost: (state, action) => {
      state.videoForNewPost = action.payload;
    },
    clearVideoForNewPost: (state) => {
      state.videoForNewPost = null;
    },
    setPostLocation: (state, action) => {
      state.postLocation = action.payload;
    },
    clearPostLocation: (state) => {
      state.postLocation = null;
    },
    toggleEditingLocationStatus: (state) => {
      state.editingLocation = !state.editingLocation;
    },
  },
});

export const {
  setError,
  clearError,
  videolocationsSuccess,
  deleteVideolocation,
  setCurrentUserVideolocations,
  clearCurrentUserVideolocations,
  setVideolocationDetails,
  clearVideolocationDetails,
  toggleSearchbar,
  setCoordinates,
  clearCoordinates,
  setVideoForNewPost,
  clearVideoForNewPost,
  setPostLocation,
  clearPostLocation,
  toggleEditingLocationStatus,
} = videolocationSlice.actions;

export const videolocationsCall = () => async (dispatch) => {
  try {
    const res = await videolocationsCallWs();
    const { data, errorMessage, status } = res;
    if (status) {
      await dispatch(videolocationsSuccess(data));
    } else {
      dispatch(setError(errorMessage));
    }
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

export const videolocationDetailsProcess =
  (_id, navigate) => async (dispatch) => {
    try {
      const res = await videolocationDetailsWs({ _id });
      const { data, errorMessage, status } = res;
      if (status) {
        return dispatch(setVideolocationDetails(data.dbLocation));
      }
      dispatch(setError(errorMessage));
      return navigate("/");
    } catch (error) {
      return dispatch(setError(error));
    }
  };

export const deleteVideolocationProcess =
  ({ _id, public_id }, navigate) =>
  async (dispatch) => {
    try {
      const { errorMessage, status } = await videolocationDeleteWs({
        _id,
        public_id,
      });
      if (status) {
        dispatch(deleteVideolocation(_id));
        dispatch(clearVideolocationDetails());
        return navigate("/mylocations");
      }
      return dispatch(setError(errorMessage));
    } catch (error) {
      return dispatch(setError(error));
    }
  };

export default videolocationSlice.reducer;
