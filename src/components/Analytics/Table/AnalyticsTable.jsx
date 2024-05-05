/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import Card from "../../Card";
import useDataContext from "../../../hooks/useDataContext";

const AnalyticsTable = ({ social }) => {
  const { analytics } = useDataContext();

  const trs = Object.keys(analytics)?.map((pageName) => {
    const type = social == "Facebook" ? "likes" : "members";
    const title = analytics[pageName][0]?.attributes.name;
    const today = analytics[pageName][0]?.attributes[type];
    const yesterday = analytics[pageName][1]?.attributes[type];

    const diffrence = today - yesterday || 0;
    return (
      <tr key={pageName} className="border-b border-gray-400">
        <th>{title}</th>
        <td>{yesterday}</td>
        <td>{today}</td>
        <td
          className={diffrence > 0 ? "text-green-500" : "text-red-500"}
          style={{ direction: "ltr" }}
        >
          {diffrence}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card
        className={
          "max-w-[600px] w-full overflow-x-auto mt-10 pt-8 px-5 relative"
        }
      >
        <div className=" absolute top-0 left-0  min-w-full">
          <span className="bg-gray-100 pt-1 text-gray-800 w-full text-center inline-block  text-lg font-bold">
            {social}
          </span>
        </div>
        {analytics.syredu?.length == 0 ? (
          <div className="min-h-[200px] flex justify-center items-center">
            <ImSpinner2 className="mx-auto text-xl animate-spin" />
          </div>
        ) : (
          <table className="w-full text-center pt-5">
            <thead>
              <tr className="border-b border-b-  border-gray-400">
                <th>#</th>
                <th>البارحة</th>
                <th>اليوم</th>
                <th>الفرق</th>
              </tr>
            </thead>
            <tbody>{trs}</tbody>
          </table>
        )}
      </Card>
    </>
  );
};

export default AnalyticsTable;
