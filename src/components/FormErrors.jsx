/* eslint-disable react/prop-types */
const Error = ({ errorsArr }) => {
  return (
    <ul className=" text-red-600 text-sm  mb-2">
      {errorsArr.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};
export default Error;
