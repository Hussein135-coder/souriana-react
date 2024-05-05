import transition from "../transition";
import syredu from "../assets/images/syredu.jpeg";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <img src={syredu} className="sm:w-[25%] w-[50%] rounded-[50%]" />
    </div>
  );
};

export default transition(Home);
