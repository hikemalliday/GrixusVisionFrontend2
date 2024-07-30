import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return <>LOADING...</>;
  }

  return authUser !== null ? <Outlet /> : <Navigate to="/login" replace />;
};
