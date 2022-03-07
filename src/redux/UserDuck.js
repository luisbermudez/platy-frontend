import { loginWs, logoutWs, authVerifyWs } from "../services/auth-ws";

const LOADING = "platy/user/LOADING";
const LOGIN_SUCCESS = "platy/user/LOGIN_SUCCESS";
const LOGIN_ERROR = "platy/user/LOGIN_ERROR";
const CLEAN_LOGIN_ERROR = "platy/user/CLEAN_LOGIN_ERROR";
const ERROR = "platy/user/ERROR";
const LOGOUT = "platy/user/LOGOUT";
const VERIFYAUTH = "platy/user/VERIFYAUTH";

const initialState = {
  user: null,
  loading: false,
  isLoggedIn: false,
  loginError: undefined,
  errorMessage: undefined,
  successMessage: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
      };
    case LOGIN_ERROR:
      return { ...state, loading: false, loginError: action.payload };
    case CLEAN_LOGIN_ERROR:
      return { ...state, loginError: undefined };
    case ERROR:
      return { ...state, loading: false, errorMessage: action.payload };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        successMessage: action.payload,
      };
    case VERIFYAUTH:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

export const getLoading = () => ({ type: LOADING });
export const getLogin = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const getLoginError = (payload) => ({ type: LOGIN_ERROR, payload });
export const getCleanLoginError = () => ({ type: CLEAN_LOGIN_ERROR });
export const getError = (payload) => ({ type: ERROR, payload });
export const getLogout = (payload) => ({ type: LOGOUT, payload });
export const getVerifyAuth = (payload) => ({ type: VERIFYAUTH, payload });

export const loginProcess = (credentials, navigate) => async (dispatch) => {
  try {
    await dispatch(getLoading());
    const res = await loginWs(credentials);
    const { data, errorMessage, status } = res;

    if (status) {
      await dispatch(getLogin(data));
      dispatch(authverifyProcess());
      navigate("/");
    } else {
      dispatch(getLoginError(errorMessage));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const logoutProcess = (navigate) => (dispatch) => {
  dispatch(getLoading());

  logoutWs().then((res) => {
    const { data, errorMessage, status } = res;

    if (status) {
      dispatch(getLogout(data));
      navigate("/");
    } else {
      dispatch(getError(errorMessage));
    }
  });
};

export const authverifyProcess = () => async (dispatch) => {
  try {
    await dispatch(getLoading());
    const res = await authVerifyWs();
    const { data, errorMessage, status } = res;

    if (status) {
      dispatch(getVerifyAuth(data.user));
    } else {
      dispatch(getError(errorMessage));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const cleanLoginErrorProcess = () => (dispatch) => {
  return dispatch(getCleanLoginError());
};
