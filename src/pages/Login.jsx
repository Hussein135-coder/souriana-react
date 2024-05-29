/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Error from "../components/FormErrors";
import { loginValidation } from "../helpers";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import { ImSpinner2 } from "react-icons/im";
import Button from "../components/Button";
import Card from "../components/Card";
import transition from "../transition";
const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [clicked, setClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // Context Data
  const { wait, userLogin } = useDataContext();

  // Erros Messages
  let passwordErrors = [],
    userNameErrors = [];

  // Validate Inputs
  loginValidation(data, userNameErrors, passwordErrors);

  // Handle Data
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    setErrorMsg("");

    if (userNameErrors.length == 0 && passwordErrors.length == 0) {
      const res = await userLogin(data);
      if (res.status == "failed") {
        setErrorMsg("حدث خطأ ما");
      } else if (res.status == "notValid") {
        setErrorMsg("خطأ في اسم المستخدم أو كلمة المرور");
      } else if (res.status == "Network Error") {
        setErrorMsg("تأكد من الاتصال بالشبكة");
      } else {
        navigate("/money");
      }
      console.log(res);
    }
  };

  return (
    <div className="py-4 min-h-screen flex justify-center items-center">
      <Card className={"px-8 py-10"}>
        <form>
          <div className="w-full">
            {/* Uesr Name */}
            <div className="mb-2">
              <label className="block mb-2 pb-2 text-gray-100">
                اسم المستخدم
              </label>
              <input
                id="name"
                type="text"
                name="username"
                onChange={handleChange}
                className="p-2 rounded w-full text-gray-900 focus:outline-0"
                placeholder="اسم المستخدم"
                aria-label="اسم المستخدم"
              />
            </div>
            {clicked && <Error errorsArr={userNameErrors} />}

            {/* Password */}
            <div className="mt-3 mb-2">
              <label className="block mb-2 text-gray-100">كلمة المرور</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                className="p-2 rounded w-full text-gray-900 focus:outline-0 "
                placeholder="كلمة المرور"
                aria-label="كلمة المرور"
              />
            </div>
            {clicked && <Error errorsArr={passwordErrors} />}

            {/* Submit */}
            <div className="flex flex-wrap justify-between mt-4">
              <Button
                type="submit"
                disabled={wait}
                onClick={handleSubmit}
                className={"w-full  px-6 py-2"}
              >
                {wait ? (
                  <ImSpinner2 className="mx-auto text-xl animate-spin" />
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>

              <Link
                to="/reset-password"
                className="text-gray-100 mt-3 inline-block "
              >
                هل نسيت كلمة السر؟
              </Link>
            </div>

            {errorMsg && (
              <span className="text-red-500 text-center mt-4 block">
                {errorMsg}
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default transition(Login);
