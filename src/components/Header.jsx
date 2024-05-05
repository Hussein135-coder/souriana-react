import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import Button from "./Button";

const links = [
  {
    name: "الرئيسية",
    to: "/",
  },
  {
    name: "الحوالات",
    to: "/money",
  },
  {
    name: "الاحصائيات",

    to: "/analytics",
  },
];
const Header = () => {
  const { user, loading, userLogout } = useDataContext();
  const [isOpen, setIsOpen] = useState(false);

  const ulBaseClass =
    " sm:static z-10 sm:translate-y-0 flex absolute flex-col py-3 sm:py-0 sm:px-[4%] bg-gray-900  sm:bg-gray-900 sm:flex-row sm:flex-grow-[2] flex-1 w-full items-center h-auto justify-between sm:justify-end sm:gap-3 m-0 transition sm:flex";

  const ulClass = isOpen
    ? ulBaseClass + " translate-y-[50px]"
    : ulBaseClass + " -translate-y-52";

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <nav className="shadow bg-gray-900 container mx-auto">
      <div className="sm:container flex sm:flex-row flex-col justify-between items-center relative mx-auto">
        <div className="flex px-[4%] items-center justify-between w-full bg-gray-900 flex-1 z-20">
          {/* Logo */}
          <Link
            className="text-[20px] py-3 no-underline  transition duration-500 text-gray-100 hover:text-gray-300"
            to="/"
          >
            سوريانا التعليمية
          </Link>
          {/* Mobile Nav Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex gap-1 sm:hidden flex-col justify-center w-[35px] h-[30px] rounded bg-gray-100"
          >
            <span className="bg-gray-900 h-0.5 mx-auto w-3/5 rounded"></span>
            <span className="bg-gray-900 h-0.5 mx-auto w-3/5 rounded"></span>
            <span className="bg-gray-900 h-0.5 mx-auto w-3/5 rounded"></span>
          </button>
        </div>

        {/* Nav Links */}
        <ul className={ulClass}>
          {links.map((link) => {
            return (
              <li key={link.name} className="w-full sm:w-max ">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    (isActive ? "bg-gray-700" : "") +
                    " no-underline w-full block sm:w-max py-5 font-medium px-[4%] sm:px-3 cursor-pointer hover:bg-gray-700 transition duration-500  text-gray-100 hover:text-gray-300"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            );
          })}

          {/* Auth Buttons */}
          <li className="w-full sm:w-[140px]">
            {loading ? (
              <button className="btn h-[40px] mx-[4%] mt-2 px-[4%] sm:px-3 rounded bg-gray-700 animate-pulse min-w-[113px]"></button>
            ) : !user.email ? (
              <Link
                to={"/login"}
                className="bg-white w-max mx-[4%] inline-block cursor-pointer font-medium p-3 duration-300 text-gray-700 rounded hover:bg-gray-700 hover:text-white transition-all active:scale-90 sm:mr-4"
              >
                تسجيل الدخول
              </Link>
            ) : (
              <Button
                onClick={() => userLogout(navigate)}
                className=" cursor-pointer inline-block px-3 py-2 duration-300 text-gray-700 rounded hover:bg-gray-700 hover:text-white transition-all active:scale-90 sm:mr-4"
              >
                تسجيل الخروج
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
