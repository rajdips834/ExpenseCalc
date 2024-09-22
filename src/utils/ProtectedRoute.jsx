import React from "react";
import { Navigate } from "react-router-dom";
import { fetchSessionUser } from "../utils/fetchSessionData";

const ProtectedRoute = ({ children }) => {
  const user = fetchSessionUser();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default ProtectedRoute;
