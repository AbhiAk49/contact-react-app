import { SESSION_KEY } from "../constants";
const headers = {};
export const getCommonHeaderOptions = (
  extraHeaders = {},
  isAuthenticated = false
) => {
  const commonOptions = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...extraHeaders,
    },
  };
  // if (isAuthenticated) {
  //   const access_token = sessionStorage.getItem(SESSION_KEY);
  //   commonOptions["headers"]["Authorization"] = `Bearer ${access_token}`;
  // }
  return commonOptions;
};
