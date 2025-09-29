import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, storeRedirectInfo } = useAuth();
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated()) {
      storeRedirectInfo();
    }
  }, [isAuthenticated, storeRedirectInfo]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default Protected;
