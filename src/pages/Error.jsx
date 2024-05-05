import transition from "../transition";

const Error = () => {
  return (
    <div className="text-white min-h-screen flex justify-center items-center flex-col text-2xl text-center mt-4">
      <h1>للأسف!</h1>
      <p>الصفحة غير موجوة</p>
    </div>
  );
};

export default transition(Error);
