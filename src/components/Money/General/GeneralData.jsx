/* eslint-disable react/prop-types */
import { NumericFormat } from "react-number-format";
import Card from "../../Card";
import "../Table/table.css";
import { analyiseMoney } from "../../../helpers";
import useDataContext from "../../../hooks/useDataContext";

const GeneralData = ({ selectedId, selectedMoney }) => {
  const { money } = useDataContext();

  // Total and Done and Pending Money
  const moneyAnalysied = {
    total: analyiseMoney(selectedMoney, "total"),
    done: analyiseMoney(selectedMoney, true),
    pending: analyiseMoney(selectedMoney, false),
  };

  // Person Money
  const personMoney = Math.floor(analyiseMoney(money, "total").moneyNumber / 3);

  return (
    <div>
      <Card className={"pt-3 pb-7 mt-6"}>
        <table className="w-full max-w-[700px] text-center">
          <thead>
            <tr className="border-b py-3 border-gray-400">
              <th>#</th>
              <th>العدد</th>
              <th>المبلغ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b  border-gray-400">
              <td>الإجمالي</td>
              <td>{moneyAnalysied.total.count}</td>
              <td>
                {
                  <NumericFormat
                    value={moneyAnalysied.total.moneyNumber}
                    thousandSeparator=","
                    displayType="text"
                  />
                }
              </td>
            </tr>
            <tr className="border-b bg-gray-800 border-gray-400">
              <td>المستلم</td>
              <td>{moneyAnalysied.done.count}</td>
              <td>
                {
                  <NumericFormat
                    value={moneyAnalysied.done.moneyNumber}
                    thousandSeparator=","
                    displayType="text"
                  />
                }
              </td>
            </tr>
            <tr className="border-b bg-gray-800 border-gray-400">
              <td>الباقي</td>
              <td>{moneyAnalysied.pending.count}</td>
              <td>
                {
                  <NumericFormat
                    value={moneyAnalysied.pending.moneyNumber}
                    thousandSeparator=","
                    displayType="text"
                  />
                }
              </td>
            </tr>
          </tbody>
        </table>
        <div className=" absolute bottom-0 left-0 min-w-full text-center py-1">
          <span className="bg-gray-100 text-gray-800 w-1/2 inline-block text-lg font-normal">
            {selectedId == "all"
              ? "حصة الشخص"
              : moneyAnalysied.total.moneyNumber > personMoney
              ? "يجب أن يدفع"
              : "يجب أن يأخذ"}
          </span>
          <span
            style={{ direction: "ltr" }}
            className="bg-gray-100 inline-block w-1/2 text-gray-800 text-lg"
          >
            {selectedId == "all" ? (
              <NumericFormat
                value={personMoney}
                thousandSeparator=","
                displayType="text"
              />
            ) : (
              <NumericFormat
                value={moneyAnalysied.total.moneyNumber - personMoney}
                thousandSeparator=","
                allowNegative={false}
                displayType="text"
              />
            )}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default GeneralData;
