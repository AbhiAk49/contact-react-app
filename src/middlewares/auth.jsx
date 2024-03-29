import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthState } from "../redux/reducers/auth/selector";

export const AuthorizeUser = ({ children }) => {
  //const token = sessionStorage.getItem(SESSION_KEY);
  const authState = useSelector(getAuthState);
  const location = useLocation();
  if (!authState.is_logged_in) {
    return (
      <Navigate
        to="/auth/login"
        state={{ path: location.pathname }}
        replace
      ></Navigate>
    );
  }
  return children;
};
