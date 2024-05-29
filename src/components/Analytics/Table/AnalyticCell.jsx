/* eslint-disable react/prop-types */

import { NumericFormat } from "react-number-format";
import useDataContext from "../../../hooks/useDataContext";

const AnalyticCell = ({ page, social }) => {
  const { monthlyAnalytics } = useDataContext();

  const type =
    social == "Facebook" ? "likes" : social == "Telegram" ? "members" : "insta";
  const monthLast =
    monthlyAnalytics[page][0] && monthlyAnalytics[page][0][type];
  const monthFirst =
    monthlyAnalytics[page][1] && monthlyAnalytics[page][1][type];

  const diffrence = monthLast - monthFirst;

  if (monthlyAnalytics[page].length != 2) return <td className="pt-4">-</td>;

  return (
    <td>
      {
        <NumericFormat
          value={monthLast}
          thousandSeparator=","
          displayType="text"
        />
      }
      <span
        style={{ direction: "ltr" }}
        className={
          (diffrence > 0 ? "text-green-500 " : "text-red-500 ") +
          " block text-xs"
        }
      >
        {diffrence !== 0 && (diffrence > 0 ? "+" : null)}
        {
          <NumericFormat
            value={diffrence}
            thousandSeparator=","
            displayType="text"
          />
        }
      </span>
    </td>
  );
};

export default AnalyticCell;
