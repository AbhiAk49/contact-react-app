import React from "react";
import { useSearchParams, useParams } from "react-router-dom";

//using this Higher Order Component to inject search (query) and path params
const withRouterParamsHook = (Component) => {
  return (props) => {
    const params = useParams(); // returns key value pairs of params
    const query = useSearchParams(); // returns current query params value and a method to update them
    return <Component {...props} search={query} params={params} />;
  };
};

export default withRouterParamsHook;
