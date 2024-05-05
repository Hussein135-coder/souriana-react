import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useDataContext from "../../hooks/useDataContext";
import { getToken } from "../../helpers";
import Loading from "../../pages/Loading";

const PersistLogin = () => {
  const { user, fetchLoggedInUser, loading } = useDataContext();
  const authToken = getToken();
  useEffect(() => {
    if (!user.token) {
      fetchLoggedInUser(authToken);
    }
  }, [user.token]);
  return <>{loading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
