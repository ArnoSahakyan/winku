import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import ROUTES from "../../routes/routes";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const notAuthenticated = !isAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (notAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  });

  return notAuthenticated ? null : <Outlet />;
};
export default ProtectedRoute;
