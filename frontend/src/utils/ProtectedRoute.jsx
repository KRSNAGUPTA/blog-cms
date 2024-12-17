import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If loading, show loading spinner or placeholder
  if (loading) {
    return <div>Loading...</div>; // Optional: You can replace this with a spinner or a better UI
  }

  // If no user is available, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children; // If user exists, render the children
};

export default ProtectedRoute;
