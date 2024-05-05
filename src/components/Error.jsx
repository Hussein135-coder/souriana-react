/* eslint-disable react/prop-types */
const Error = ({ errorsArr, className = "" }) => {
  return (
    <ul className={className + " text-red-600 text-sm mt-[-10px] mb-2 pt-3"}>
      {errorsArr?.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};

export default Error;
