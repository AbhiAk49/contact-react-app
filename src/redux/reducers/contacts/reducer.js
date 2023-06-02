import { ActionTypes } from "../../constants/contact-action-types";
import { API_FETCH_STATUS } from "../../../constants";

const initialState = {
  data: [],
  showStarred: false,
  status: "idle", // idle | loading | success | error
  error: null,
};

const updateContactArray = (id, contacts, action = "star") => {
  return contacts.map((c) => {
    if (c.id === id) {
      c["starred"] = action === "unstar" ? false : true;
      return c;
    } else {
      return c;
    }
  });
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
        data: [],
      };
    }
    case ActionTypes.SET_STATUS_ERROR: {
      return { ...state, error: payload, status: API_FETCH_STATUS.ERROR };
    }
    case ActionTypes.SET_STATUS_SUCCESS: {
      const { contacts, starred } = payload;
      return {
        ...state,
        error: null,
        status: API_FETCH_STATUS.SUCCESS,
        data: contacts,
        showStarred: starred,
      };
    }
    case ActionTypes.UPDATE_CONTACT_STAR: {
      const { id } = payload;
      const { data: newContacts } = structuredClone(state);
      const updatedContacts = updateContactArray(id, newContacts, "star");
      return {
        ...state,
        data: updatedContacts,
      };
    }
    case ActionTypes.UPDATE_CONTACT_UNSTAR: {
      const { id } = payload;
      const { data: newContacts } = structuredClone(state);
      let updatedContacts;
      if (state.showStarred) {
        updatedContacts = state.data.filter((c) => c.id !== id);
      } else {
        updatedContacts = updateContactArray(id, newContacts, "unstar");
      }
      return {
        ...state,
        data: updatedContacts,
      };
    }
    case ActionTypes.DELETE_CONTACT: {
      const { id } = payload;
      const updatedContacts = state.data.filter((c) => c.id !== id);
      return {
        ...state,
        data: updatedContacts,
      };
    }
    default: {
      return state;
    }
  }
}
