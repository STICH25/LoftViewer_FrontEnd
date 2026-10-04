import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../auth/token";

/** Renders its children only when a token exists; otherwise redirects to /login. */
const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  const token = user?.token || getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
