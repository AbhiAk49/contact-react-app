import { ActionTypes } from "../constants/auth-action-types";
import { login, register, fetchUser, logout } from "../../services/auth.service";
import { SESSION_KEY } from "../../constants";

export const logOutUser = () => async (dispatch) => {
  //sessionStorage.removeItem(SESSION_KEY);
  dispatch(setlogOut());
  let response;
  try {
    response = await logout();
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

export const setlogIn = (user) => {
  return {
    type: ActionTypes.SET_USER_DATA,
    payload: user,
  };
};

export const logInUser = (data) => async (dispatch) => {
  let response;
  try {
    response = await login(data);
  } catch (error) {
    return;
  }
  dispatch(setlogIn(response.user));
  //const access_token = response.tokens.access.token;
  //sessionStorage.setItem(SESSION_KEY, access_token);
};

export const registerInUser = (data) => async (dispatch) => {
  let response;
  try {
    response = await register(data);
  } catch (error) {
    return;
  }
  dispatch(setlogIn(response.user));
  //const access_token = response.tokens.access.token;
  //sessionStorage.setItem(SESSION_KEY, access_token);
};

export const fetchUserData = () => async (dispatch) => {
  let response;
  try {
    response = await fetchUser();
  } catch (error) {
    dispatch(setlogOut());
    sessionStorage.removeItem(SESSION_KEY)
    return;
  }
  dispatch(setlogIn(response));
};
