import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? <Navigate to="/main" /> : children;
};

export default PublicRoute;
