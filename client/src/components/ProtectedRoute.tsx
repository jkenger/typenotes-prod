import useAuth from "./hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Links } from "./types/types";

function ProtectedRoute() {
  const location = useLocation();
  const { isAdmin, isManager } = useAuth();

  return isAdmin || isManager ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to={Links.NOTES} />
  );
}

export default ProtectedRoute;
