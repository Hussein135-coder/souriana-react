/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useDataContext from "../../../hooks/useDataContext";

const OneMoney = ({ children, setSelectedMoney, selectedId }) => {
  const { getOneMoney, user } = useDataContext();

  const getData = async () => {
    const res = await getOneMoney(user.token, selectedId);
    setSelectedMoney(res.data);
  };

  useEffect(() => {
    getData();
    return () => {
      setSelectedMoney(null);
    };
  }, []);
  return <div>{children}</div>;
};

export default OneMoney;
