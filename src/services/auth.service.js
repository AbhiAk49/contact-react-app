import { _axios, handleUnAuthError, onLoadError } from "./axios.service";
import { getCommonHeaderOptions, getGoogleOauthUrl } from "./utils.service";

getGoogleOauthUrl();

const login = async (body = {}) => {
  try {
    const axiosOptions = getCommonHeaderOptions();
    const response = await _axios.post("auth/login", body, axiosOptions);
    return response.data;
  } catch (error) {
    handleUnAuthError(error);
  }
};

const logout = async (body = {}) => {
  try {
    const axiosOptions = getCommonHeaderOptions();
    const response = await _axios.post("auth/logout", body, axiosOptions);
    return response.data;
  } catch (error) {
    handleUnAuthError(error);
  }
};

const register = async (body = {}) => {
  try {
    const axiosOptions = getCommonHeaderOptions();
    const response = await _axios.post("auth/register", body, axiosOptions);
    return response.data;
  } catch (error) {
    handleUnAuthError(error);
  }
};

const fetchUser = async () => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.get("users/user", axiosOptions);
    return response.data;
  } catch (error) {
    onLoadError(error);
  }
};

export { login, register, fetchUser, logout };
