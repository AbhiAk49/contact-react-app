import { combineReducers } from "redux";
import contactsReducer from "./contacts/reducer";
import selectedContactReducer from "./selectedContact/reducer";

const appReducer = combineReducers({
  contacts: contactsReducer,
  selectedContact: selectedContactReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
