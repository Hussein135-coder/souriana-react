import { useEffect, useState } from "react";
import DataTable from "../components/Money/Table/DataTable";
import FilterBtns from "../components/Money/General/FilterBtns";
import GeneralData from "../components/Money/General/GeneralData";
import useDataContext from "../hooks/useDataContext";
import AddMoney from "../components/Money/Form/AddMoney";
import transition from "../transition";

const names = [
  { all: "الكل" },
  { hussein: "حسين" },
  { saleh: "صالح" },
  { deaa: "ضياء" },
];

const Money = () => {
  const { getMoney, user, money } = useDataContext();

  const [selectedMoney, setSelectedMoney] = useState([]);
  const [selectedId, setSelectedId] = useState("all");

  useEffect(() => {
    getMoney(user.token);
  }, []);

  function filterMoney(user) {
    setSelectedId(user);
    if (user === "all") {
      setSelectedMoney(money);
    } else {
      const filterdMoney = money.filter((item) => {
        return item.attributes.user == user;
      });
      setSelectedMoney(filterdMoney);
    }
  }

  useEffect(() => {
    setSelectedMoney(money);
    setSelectedId("all");
  }, [money]);

  return (
    <div className="container mx-auto px-[4%]">
      <h3 className="mt-14 mb-5 dark:text-gray-100 text-xl sm:text-2xl  ">
        أهلا بك {user.id ? names[user.id][user.username] : null}
      </h3>
      <AddMoney />
      <h3 className="mt-5 mb-5 dark:text-gray-100 text-xl sm:text-2xl text-center ">
        الحوالات المالية
      </h3>
      <FilterBtns
        names={names}
        filterMoney={filterMoney}
        selectedId={selectedId}
      />
      <GeneralData selectedMoney={selectedMoney} selectedId={selectedId} />
      <DataTable selectedMoney={selectedMoney} />
    </div>
  );
};

export default transition(Money);
