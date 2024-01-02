import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, redirect } from "react-router";

const PrivateRoute = ({ children}) => {
  const { isAuthenticated, user } = useAuth0()
  const isUser = isAuthenticated && user
  if (!isUser) {
    return <Navigate to='/login'/>
  }
  return children
};
export default PrivateRoute;
