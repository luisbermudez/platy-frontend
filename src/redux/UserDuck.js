import { loginWs, logoutWs, authVerifyWs } from "../services/auth-ws";

const LOADING = "platy/user/LOADING";
const LOGIN_SUCCESS = "platy/user/LOGIN_SUCCESS";
const LOGIN_FAIL = "platy/user/LOGIN_FAIL";
const CLEAN_LOGIN_ERROR = "platy/user/CLEAN_LOGIN_ERROR";
const ERROR = "platy/user/ERROR";
const LOGOUT = "platy/user/LOGOUT";
const VERIFYAUTH = "platy/user/VERIFYAUTH";
const VERIFYAUTH_FAIL = "platy/user/VERIFYAUTH_FAIL";

const initialState = {
  user: null,
  loading: false,
  isLoggedIn: false,
  displayError: undefined,
  errorMessage: undefined,
  successMessage: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: !state.loading };
    case LOGIN_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        errorMessage: undefined,
        displayError: undefined,
      };
    case LOGIN_FAIL:
      return { ...state, displayError: action.payload };
    case CLEAN_LOGIN_ERROR:
      return { ...state, displayError: undefined };
    case ERROR:
      return { ...state, errorMessage: action.payload };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        successMessage: action.payload,
      };
    case VERIFYAUTH:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case VERIFYAUTH_FAIL:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

export const getLoading = () => ({ type: LOADING });
export const getLoginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const getLoginFail = (payload) => ({ type: LOGIN_FAIL, payload });
export const getCleanLoginError = () => ({ type: CLEAN_LOGIN_ERROR });
export const getError = (payload) => ({ type: ERROR, payload });
export const getLogout = (payload) => ({ type: LOGOUT, payload });
export const getVerifyAuth = (payload) => ({ type: VERIFYAUTH, payload });
export const getVerifyAuthFail = (payload) => ({
  type: VERIFYAUTH_FAIL,
  payload,
});

export const loginProcess = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(getLoading());
    const res = await loginWs(credentials);
    const { data, errorMessage, status } = res;

    if (status) {
      dispatch(getLoginSuccess(data));
      await dispatch(authverifyProcess());
      dispatch(getLoading());
      return navigate("/");
    } else {
      return dispatch(getLoginFail(errorMessage));
    }
  } catch (error) {
    return dispatch(getError(error));
  }
};

export const logoutProcess = (navigate) => (dispatch) => {
  dispatch(getLoading());

  logoutWs().then((res) => {
    const { data, errorMessage, status } = res;

    if (status) {
      dispatch(getLogout(data));
      dispatch(getLoading());
      navigate("/");
    } else {
      dispatch(getError(errorMessage));
      dispatch(getLoading());
    }
  });
};

export const authverifyProcess = () => async (dispatch) => {
  try {
    const res = await authVerifyWs();
    const { data, errorMessage, status } = res;

    if (status) {
      return dispatch(getVerifyAuth(data.user));
    } else {
      return dispatch(getVerifyAuthFail(errorMessage));
    }
  } catch (error) {
    return dispatch(getVerifyAuthFail(error));
  }
};

export const cleanLoginErrorProcess = () => (dispatch) => {
  return dispatch(getCleanLoginError());
};
