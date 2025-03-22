import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check token from local storage
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
