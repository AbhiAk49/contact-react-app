import { combineReducers } from "redux";
import contactsReducer from "./contacts/reducer";
import selectedContactReducer from "./selectedContact/reducer";
import authReducer from "./auth/reducer";

const appReducer = combineReducers({
  contacts: contactsReducer,
  selectedContact: selectedContactReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
