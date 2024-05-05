/* eslint-disable react/prop-types */
const Card = ({ children, className }) => {
  return (
    <div
      className={
        " relative overflow-hidden shadow-card max-w-[500px] rounded-lg bg-gray-800 text-gray-100  mx-auto my-4 w-5/6 " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Card;
