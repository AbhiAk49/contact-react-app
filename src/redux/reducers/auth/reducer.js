import { ActionTypes } from "../../constants/auth-action-types";
import { SESSION_KEY } from "../../../constants";
import { fetchUser } from "../../../services/auth.service";
const found_access_token = sessionStorage.getItem(SESSION_KEY);
const initialState = {
  is_logged_in: false,
  user_data: null,
};
if (found_access_token) {
  const user = await fetchUser();
  if (user) {
    initialState["is_logged_in"] = true;
    initialState["user_data"] = user;
  }
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.SET_USER_DATA: {
      return {
        is_logged_in: true,
        user_data: payload,
      };
    }
    case ActionTypes.CLEAR_USER_DATA: {
      return {
        is_logged_in: false,
        user_data: null,
      };
    }
    default: {
      return state;
    }
  }
}
