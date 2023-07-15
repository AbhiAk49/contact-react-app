import { SESSION_KEY } from "../constants";
const google_client_id = import.meta.env.VITE_OAUTH_G_CLIENT_ID;
const google_redirect_path = import.meta.env.VITE_OAUTH_G_REDIRECT_PATH;
const base_url = import.meta.env.VITE_BASE_API_URL;
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

// googleOauthUrl

export const getGoogleOauthUrl = () => {
  const root_url = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${base_url}${google_redirect_path}`,
    client_id: google_client_id,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    include_granted_scopes: true
  };
  const queryString = new URLSearchParams(options);
  return `${root_url}?${queryString.toString()}`;
};
