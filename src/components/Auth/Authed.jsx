import { Link, Outlet } from "react-router-dom";
import useDataContext from "../../hooks/useDataContext";

const Authed = () => {
  const { user } = useDataContext();

  if (user.email) {
    return (
      <div className="text-center text-white flex items-center gap-4 flex-col min-h-screen justify-center">
        <div className="text-3xl">You are Logged In</div>
        <Link to={-1} className="p-2 bg-gray-700 rounded">
          Go Back
        </Link>
      </div>
    );
  } else {
    return <Outlet />;
  }
};

export default Authed;
