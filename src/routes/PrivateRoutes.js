import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

const PrivateRoutes = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} />
  );
};

export default PrivateRoutes;
