import { useAuthContext } from "../Contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated == null) {
    return <CircularProgress />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
