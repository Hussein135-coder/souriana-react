/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import Card from "../../Card";
import useDataContext from "../../../hooks/useDataContext";
import { NumericFormat } from "react-number-format";

const AnalyticsTable = ({ social }) => {
  const { analytics } = useDataContext();

  const analyticsArr = Object.keys(analytics);
  const getAnalytics = (pageName) => {
    const type =
      social == "Facebook"
        ? "likes"
        : social == "Telegram"
        ? "members"
        : "insta";

    console.log(analytics["syredu"][0]?.date);
    console.log(analytics["syredu"][1]?.date);
    const title = analytics[pageName][0]?.name;
    const today = analytics[pageName][0] && analytics[pageName][0][type];
    const yesterday = analytics[pageName][1] && analytics[pageName][1][type];

    const diffrence = today - yesterday || 0;

    return { title, today, yesterday, diffrence };
  };
  const diffArr = analyticsArr?.map((pageName) => {
    const { diffrence } = getAnalytics(pageName);
    return diffrence;
  });

  const maxDiff = Math.max(...diffArr);

  const trs = analyticsArr?.map((pageName) => {
    const { title, today, yesterday, diffrence } = getAnalytics(pageName);
    let syreduDiffrence = 0;
    if (pageName != "syredu") {
      const { today: syreduToday } = getAnalytics("syredu");
      syreduDiffrence = syreduToday - today;
    }
    const syreduDiffStyle =
      syreduDiffrence > 0 ? "text-green-500" : "text-red-500";
    return (
      <tr key={pageName} className="border-b border-gray-400">
        <td
          className="text-sm sm:text-base"
          style={diffrence == maxDiff ? { color: "#ff9800" } : {}}
        >
          {title}
          {pageName != "syredu" && (
            <span
              className={"block " + syreduDiffStyle}
              style={{ direction: "ltr" }}
            >
              <NumericFormat
                value={syreduDiffrence}
                thousandSeparator=","
                displayType="text"
              />
            </span>
          )}
        </td>
        <td>
          <NumericFormat
            value={yesterday}
            thousandSeparator=","
            displayType="text"
          />
        </td>
        <td>
          <NumericFormat
            value={today}
            thousandSeparator=","
            displayType="text"
          />
        </td>
        <td
          className={diffrence > 0 ? "text-green-500" : "text-red-500"}
          style={{ direction: "ltr" }}
        >
          <NumericFormat
            value={diffrence}
            thousandSeparator=","
            displayType="text"
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className={"max-w-[600px] w-full  mt-10 pt-8 relative"}>
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
          <div className="overflow-x-auto px-1">
            <table className="w-full text-center pt-5">
              <thead>
                <tr className="border-b border-gray-400">
                  <th>#</th>
                  <th>/ {analytics["syredu"][1]?.date} /</th>
                  <th>/ {analytics["syredu"][0]?.date} /</th>
                  <th>الفرق</th>
                </tr>
              </thead>
              <tbody>{trs}</tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
};

export default AnalyticsTable;
