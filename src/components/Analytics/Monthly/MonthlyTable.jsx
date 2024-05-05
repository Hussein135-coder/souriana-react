/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import Card from "../../Card";
import AnalyticCell from "../Table/AnalyticCell";

const MonthlyTable = ({ social, dataLoading, month }) => {
  return (
    <>
      <Card
        className={
          "max-w-[600px] w-full overflow-x-auto mt-10 pt-12 px-5 pb-4 relative"
        }
      >
        <div className=" absolute top-0 left-0  min-w-full">
          <span className="bg-gray-100 pt-1 text-gray-800 w-full text-center inline-block  text-lg font-bold">
            {social}
          </span>
        </div>
        {dataLoading ? (
          <ImSpinner2 className="mx-auto text-xl animate-spin" />
        ) : (
          <table className="w-full text-center pt-5">
            <thead>
              <tr className="border-b  border-gray-400">
                <th>الشهر</th>
                <th>سوريانا</th>
                <th>بكالوريا</th>
                <th>سوريا</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-400">
                <th>{month.current.value}</th>
                {["syredu", "bac", "syr"].map((page, i) => {
                  return <AnalyticCell key={i} page={page} social={social} />;
                })}
              </tr>
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
};

export default MonthlyTable;
