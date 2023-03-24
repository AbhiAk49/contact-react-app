import React from "react";
import { useNavigate } from "react-router-dom";

//using this Higher Order Component to inject useNavigate from react-router-dom into component passed
const withNavigateHook = (Component) => {
  return (props) => {
    const navigation = useNavigate();
    return <Component navigation={navigation} {...props} />;
  };
};

export default withNavigateHook;
