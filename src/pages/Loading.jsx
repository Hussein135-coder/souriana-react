import { ImSpinner2 } from "react-icons/im";

function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <ImSpinner2 className="mx-auto text-xl text-gray-100 animate-spin" />
    </div>
  );
}

export default Loading;
