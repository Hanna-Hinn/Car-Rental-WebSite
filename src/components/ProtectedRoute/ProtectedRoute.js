//A Protected Route that will redirect the user to the landing page when entering an unauthorized url
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
