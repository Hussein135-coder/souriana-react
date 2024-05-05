import { Navigate, Outlet, useLocation } from "react-router-dom";
import useDataContext from "../../hooks/useDataContext";

const RequireAuth = () => {
  const { user } = useDataContext();
  const location = useLocation();
  if (!user.email) {
    return <Navigate state={{ from: location }} replace to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
