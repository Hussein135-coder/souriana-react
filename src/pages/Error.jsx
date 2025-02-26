import { Link } from "react-router-dom";
import transition from "../transition";

const Error = () => {
  return (
    <div className="text-white min-h-[calc(100vh-84px)] flex justify-center items-center flex-col text-center mt-4">
      <h1 className="text-2xl mb-2 font-bold">للأسف, الصفحة غير موجوة!</h1>
      <Link to={-1} className="text-gray-400">
        عودة للصفحة السابقة
      </Link>
    </div>
  );
};

export default transition(Error);
