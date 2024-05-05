import { useRef, useState } from "react";
import Card from "../../Card";
import MonthlyTable from "./MonthlyTable";
import Button from "../../Button";
import useDataContext from "../../../hooks/useDataContext";

const MonthlyAnalytics = () => {
  const months = [
    {
      number: "01",
      name: "كانون الثاني",
    },
    {
      number: "02",
      name: "شباط",
    },
    {
      number: "03",
      name: "آذار",
    },
    {
      number: "04",
      name: "نيسان",
    },
    {
      number: "05",
      name: "أيار",
    },
    {
      number: "06",
      name: "حزيران",
    },
    {
      number: "07",
      name: "تموز",
    },
    {
      number: "08",
      name: "آب",
    },
    {
      number: "09",
      name: "أيلول",
    },
    {
      number: "10",
      name: "تشرين الأول",
    },
    {
      number: "11",
      name: "تشرين الثاني",
    },
    {
      number: "12",
      name: "كانون الأول",
    },
  ];
  const { getMonthAnalytics, user } = useDataContext();

  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const year = useRef("");
  const month = useRef("");

  const getPageAnalytics = async (endPoint) => {
    setDataLoading(true);
    try {
      const res = await getMonthAnalytics(
        user.token,
        endPoint,
        year.current.value,
        month.current.value
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = () => {
    setSearch(true);
    setTimeout(() => {
      window.scrollTo("", window.scrollY + 250);
    }, 200);

    ["syredu", "bac", "syr"].forEach((page) => {
      getPageAnalytics(page);
    });
  };

  return (
    <>
      <Card className={"px-8 py-4 mt-10"}>
        <div className="mb-2">
          <label className="block my-2 text-gray-100">السنة</label>
          <select
            ref={year}
            required
            className="block border w-full p-2 outline-none rounded mt-2 text-gray-900"
            name="year"
          >
            <option value={"2023"}>2023</option>
            <option value={"2024"}>2024</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block my-2 text-gray-100">الشهر</label>
          <select
            ref={month}
            required
            className="block border w-full p-2 outline-none rounded mt-2 text-gray-900"
            name="month"
          >
            {months.map((month) => {
              return (
                <option key={month.number} value={month.number}>
                  {month.name}
                </option>
              );
            })}
          </select>
        </div>

        <Button
          onClick={handleSubmit}
          type={"submit"}
          className={"px-3 py-2 mt-4 !w-full"}
        >
          بحث
        </Button>
      </Card>

      {search && (
        <MonthlyTable
          social={"Facebook"}
          dataLoading={dataLoading}
          month={month}
        />
      )}
      {search && (
        <MonthlyTable
          social={"Telegram"}
          dataLoading={dataLoading}
          month={month}
        />
      )}
    </>
  );
};

export default MonthlyAnalytics;
