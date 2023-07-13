import { ActionTypes } from "../constants/contact-action-types";
import { getContacts } from "../../services/contact.service";
import { checkForUnauthorized } from "./auth";
//actions must return plain javascript objects
//action returns the obj data with payload and action type

//if we use an action to fetch contacts async operation
// we can't use it directly because it only supports sync code
// To use async actions, we need to use a middleware redux-thunk to convert it to async

//Two types of action creators:
//1. Sync Action Creators -> Immediately return the action object with type and payload
//2. Async Action Creators -> Takes some time return the action object with type and payload.

// for 1. Redux w/out middleware
//To change state, we invoke -> Action Creator -> returns obj as ->  Action -> then passed to -> Dispatch -> forwards the action to ->  Reducer -> which creates the new -> State.

// for 2. Redux with middleware (adds b/w dispatch and reducer)
//To change state, we invoke -> Action Creator -> returns obj as ->  Action -> then passed to -> Dispatch -> forwards the action to -> Middleware -> sends the action to ->  Reducer -> which creates the new -> State.
// Here middleware will hold the action creator until it receives the data from server.

export const setContactsLoading = () => {
  return {
    type: ActionTypes.SET_STATUS_LOADING,
  };
};

export const setContacts = (contacts, starred = false) => {
  return {
    type: ActionTypes.SET_STATUS_SUCCESS,
    payload: { contacts, starred },
  };
};

export const setContactsError = (error) => {
  return {
    type: ActionTypes.SET_STATUS_ERROR,
    payload: error.message,
  };
};

export const setSingleContactStar = (id) => {
  return {
    type: ActionTypes.UPDATE_CONTACT_STAR,
    payload: { id },
  };
};

export const setSingleContactUnstar = (id) => {
  return {
    type: ActionTypes.UPDATE_CONTACT_UNSTAR,
    payload: { id },
  };
};

export const deleteSingleContact = (id) => {
  return {
    type: ActionTypes.DELETE_CONTACT,
    payload: { id },
  };
};

export const fetchContacts =
  (starred = false) =>
  async (dispatch) => {
    dispatch(setContactsLoading());
    let response;
    try {
      response = await getContacts(starred);
    } catch (error) {
      if(checkForUnauthorized(error, dispatch)){
        return;
      }
      dispatch(setContactsError(error));
      return;
    }
    dispatch(setContacts(response, starred));
  };
