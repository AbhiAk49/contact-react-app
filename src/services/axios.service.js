import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SESSION_KEY } from "../constants";
//const baseURL = process.env.VITE_BASE_API_URL;
const baseURL = import.meta.env.VITE_BASE_API_URL;
//using static token -- api key

export const _axios = axios.create({
  baseURL,
  withCredentials: true,
});

export const onLoadError = (error) => {
  if (
    error.response &&
    error.response.status &&
    [401, 403].includes(error.response.status)
  ) {
    return;
  } else {
    console.error("onLoadError", error);
  }
  //sessionStorage.removeItem(SESSION_KEY);
  //throw new Error(error?.response?.data?.message || "Session Expired");
};

export const handleError = (error) => {
  if (
    error.response &&
    error.response.status &&
    [401, 403].includes(error.response.status)
  ) {
    console.error("Session expired");
    sessionStorage.removeItem(SESSION_KEY);
    //reloading page when we receive un-auth error
    // window.location.reload();
    throw new Error(error.response.data.message || "Session Expired");
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    toast(error.response.data.message, { autoClose: 3000, type: "error" });
    throw new Error(error.response.data.message);
  } else {
    console.error("axios service error", error);
    toast.error("Something went wrong");
    throw new Error("Something went wrong");
  }
};

export const handleUnAuthError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    toast(error.response.data.message, { autoClose: 3000, type: "error" });
    throw new Error(error.response.data.message);
  } else {
    console.error("axios service error", error);
    toast.error("Something went wrong");
    throw new Error("Something went wrong");
  }
};
