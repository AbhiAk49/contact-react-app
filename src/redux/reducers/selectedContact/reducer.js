import { ActionTypes } from "../../constants/selected-contact-action-types";
import { API_FETCH_STATUS } from "../../../constants";
const initialState = {
  contact: {},
  status: "idle", // idle | loading | success | error
  error: null,
};
//reducer func takes 2 args (state, action)
export default function contactsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ActionTypes.SET_STATUS_LOADING: {
      return {
        ...state,
        error: null,
        status: API_FETCH_STATUS.LOADING,
        contact: {},
      };
    }
    case ActionTypes.SET_STATUS_ERROR: {
      return { ...state, error: payload, status: API_FETCH_STATUS.ERROR };
    }

    case ActionTypes.SET_STATUS_SUCCESS: {
      return {
        ...state,
        error: null,
        status: API_FETCH_STATUS.SUCCESS,
        contact: payload,
      };
    }
    default: {
      return state;
    }
  }
}
