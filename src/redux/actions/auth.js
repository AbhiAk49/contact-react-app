import { ActionTypes } from "../constants/auth-action-types";
import { login, register, fetchUser, logout } from "../../services/auth.service";
import { SESSION_KEY } from "../../constants";

export const logOutUser = () => async (dispatch) => {
  dispatch(setAuthLoading());
  //sessionStorage.removeItem(SESSION_KEY);
  dispatch(setlogOut());
  try {
    await logout();
  } catch (error) {
    return;
  }
};

export const setlogOut = () => {
  //sessionStorage.removeItem(SESSION_KEY);
  return {
    type: ActionTypes.CLEAR_USER_DATA,
  };
};

export const setAuthLoading = () => {
  //sessionStorage.removeItem(SESSION_KEY);
  return {
    type: ActionTypes.SET_AUTH_LOADING,
  };
};

export const setlogIn = (user) => {
  return {
    type: ActionTypes.SET_USER_DATA,
    payload: user,
  };
};

export const logInUser = (data) => async (dispatch) => {
  dispatch(setAuthLoading());
  let response;
  try {
    response = await login(data);
  } catch (error) {
    dispatch(setlogOut());
    return;
  }
  dispatch(setlogIn(response.user));
  //const access_token = response.tokens.access.token;
  //sessionStorage.setItem(SESSION_KEY, access_token);
};

export const registerInUser = (data) => async (dispatch) => {
  dispatch(setAuthLoading());
  let response;
  try {
    response = await register(data);
  } catch (error) {
    dispatch(setlogOut());
    return;
  }
  dispatch(setlogIn(response.user));
  //const access_token = response.tokens.access.token;
  //sessionStorage.setItem(SESSION_KEY, access_token);
};

export const fetchUserData = () => async (dispatch) => {
  dispatch(setAuthLoading());
  let response;
  try {
    response = await fetchUser();
    dispatch(setlogIn(response));
    return;
  } catch (error) {
    dispatch(setlogOut());
    //sessionStorage.removeItem(SESSION_KEY)
    return;
  }
};


export const checkForUnauthorized = (error, dispatch) => {
  if(error?.message === 'unauthorized'){
    dispatch(setlogOut());
    return true;
  }
  return false;
}