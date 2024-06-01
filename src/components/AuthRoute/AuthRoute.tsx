import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import ROUTES from "../../routes/routes";

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const shouldRedirect = isAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      navigate(ROUTES.HOME);
    }
  })

  return shouldRedirect ? null : <Outlet />;
};

export default AuthRoute;
