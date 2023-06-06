import { ActionTypes } from "../constants/selected-contact-action-types";
import {
  fetchContacts,
  setSingleContactStar,
  setSingleContactUnstar,
  deleteSingleContact,
} from "./contacts";
import {
  getContact,
  updateContact,
  deleteContact,
  addContact,
  updateContactStarred,
} from "../../services/contact.service";

export const setContactByIdLoading = () => {
  return {
    type: ActionTypes.SET_STATUS_LOADING,
  };
};

export const setContactById = (contact) => {
  return {
    type: ActionTypes.SET_STATUS_SUCCESS,
    payload: contact,
  };
};

export const setContactByIdError = (error) => {
  return {
    type: ActionTypes.SET_STATUS_ERROR,
    payload: error.message,
  };
};

export const fetchContactById = (id) => async (dispatch) => {
  dispatch(setContactByIdLoading());
  let response;
  try {
    response = await getContact(id);
  } catch (error) {
    dispatch(setContactByIdError(error));
    return;
  }
  dispatch(setContactById(response));
};

export const updateContactById = (id, data) => async (dispatch) => {
  dispatch(setContactByIdLoading());
  let response;
  try {
    response = await updateContact(id, data);
  } catch (error) {
    dispatch(setContactByIdError(error));
    return;
  }
  dispatch(setContactById(response));
};

export const addContactById = (data) => async (dispatch) => {
  dispatch(setContactByIdLoading());
  let response;
  try {
    response = await addContact(data);
  } catch (error) {
    dispatch(setContactByIdError(error));
    return;
  }
  dispatch(setContactById(response));
};

export const deleteContactById =
  (id, starredFilter = false) =>
  async (dispatch) => {
    //dispatch(setContactByIdLoading());
    try {
      await deleteContact(id);
    } catch (error) {
      dispatch(setContactByIdError(error));
      dispatch(fetchContacts(starredFilter));
      return;
    }
    dispatch(deleteSingleContact(id))
    //dispatch(setContactById({}));
  };

export const updateContactStarredById =
  (id, data, starredFilter = false) =>
  async (dispatch) => {
    //dispatch(setContactByIdLoading());
    const { starred } = data;
    try {
      await updateContactStarred(id, data);
    } catch (error) {
      dispatch(setContactByIdError(error));
      dispatch(fetchContacts(starredFilter));
      return;
    }
    if (starred) {
      dispatch(setSingleContactStar(id));
    } else {
      dispatch(setSingleContactUnstar(id));
    }
    //dispatch(setContactById({}));
  };
