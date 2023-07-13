import { ActionTypes } from "../../constants/auth-action-types";
import { SESSION_KEY } from "../../../constants";
import { fetchUser } from "../../../services/auth.service";
// const found_access_token = sessionStorage.getItem(SESSION_KEY);
const initialState = {
  is_loading: false,
  is_logged_in: false,
  user_data: null,
};
//const user = await fetchUser();
// if (user) {
//   initialState["is_logged_in"] = true;
//   initialState["user_data"] = user;
// }
// if (found_access_token) {
// }

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.SET_USER_DATA: {
      return {
        is_loading: false,
        is_logged_in: true,
        user_data: payload,
      };
    }
    case ActionTypes.CLEAR_USER_DATA: {
      return {
        is_loading: false,
        is_logged_in: false,
        user_data: null,
      };
    }
    case ActionTypes.SET_AUTH_LOADING: {
      return {
        ...state,
        is_loading: true,
      };
    }
    default: {
      return state;
    }
  }
}
