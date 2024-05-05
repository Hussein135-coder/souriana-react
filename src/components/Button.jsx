/* eslint-disable react/prop-types */
const Button = ({ children, onClick, disabled, className, type, active }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        (active ? active : "bg-white text-gray-700") +
        " sm:w-fit duration-300  rounded hover:bg-gray-700 hover:text-white transition-all active:scale-90 " +
        className
      }
    >
      {children}
    </button>
  );
};

export default Button;
