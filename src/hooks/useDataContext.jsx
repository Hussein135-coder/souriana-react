import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const useDataContext = () => {
  const context = useContext(DataContext);
  return context;
};

export default useDataContext;
