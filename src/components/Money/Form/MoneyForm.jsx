/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import Button from "../../Button";
import useDataContext from "../../../hooks/useDataContext";
import { moneyValidation } from "../../../helpers";
import Error from "../../Error";

const MoneyForm = ({
  initData,
  handleSubmit,
  title,
  errorMsg,
  clicked,
  setValid,
  valid,
}) => {
  const { wait } = useDataContext();
  const [data, setData] = useState(initData);

  useEffect(() => {
    setData(initData);
  }, [initData]);

  // Handle Data
  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  // Erros Messages

  let nameErrors = [],
    numberErrors = [],
    companyErrors = [],
    dateErrors = [];

  // Validate Inputs
  moneyValidation(data, nameErrors, numberErrors, companyErrors, dateErrors);

  useEffect(() => {
    if (
      nameErrors.length == 0 &&
      numberErrors.length == 0 &&
      companyErrors.length == 0 &&
      dateErrors.length == 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data]);

  console.log(
    nameErrors,
    companyErrors,
    dateErrors,
    numberErrors,
    valid,
    "äerroes"
  );

  console.log(data);

  return (
    <form>
      <div className="w-full">
        {/* Name */}
        <div className="mb-2">
          <label className="block my-2 text-gray-100">الاسم</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            defaultValue={data?.name}
            className="p-2 rounded w-full text-gray-900 focus:outline-0"
            placeholder="الاسم"
            aria-label="الاسم"
          />
        </div>
        {clicked && <Error errorsArr={nameErrors} />}

        {/* Number */}
        <div className="mt-3 mb-2">
          <label className="block my-2 text-gray-100">المبلغ</label>
          <input
            id="number"
            type="number"
            name="number"
            onChange={handleChange}
            defaultValue={data?.number}
            className="p-2 rounded w-full text-gray-900 focus:outline-0 "
            placeholder="المبلغ"
            aria-label="المبلغ"
          />
        </div>
        {clicked && <Error errorsArr={numberErrors} />}

        {/* Company */}
        <div className="mb-2">
          <label className="block my-2 text-gray-100">الشركة</label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            defaultValue={data?.company}
            className="p-2 rounded w-full text-gray-900 focus:outline-0"
            placeholder="الشركة"
            aria-label="الشركة"
          />
        </div>
        {clicked && <Error errorsArr={companyErrors} />}

        {/* Date */}
        <div className="mb-2">
          <label className="block my-2 text-gray-100">التاريخ</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            defaultValue={data?.date}
            className="p-2 rounded w-full text-gray-900 focus:outline-0"
            placeholder="التاريخ"
            aria-label="التاريخ"
          />
        </div>
        {clicked && <Error errorsArr={dateErrors} />}

        {/* Status */}
        <div className="mb-2">
          <label className="block my-2 text-gray-100">الحالة</label>
          <select
            defaultValue={Number(data?.status)}
            required
            onChange={handleChange}
            className="block border w-full p-2 outline-none rounded mt-2 text-gray-900"
            name="status"
          >
            <option value={0}>في الانتظار</option>
            <option value={1}>تم الاستلام</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex flex-wrap justify-between mt-4">
          <Button
            type="submit"
            disabled={wait}
            onClick={(e) => handleSubmit(e, data)}
            className={"w-full  px-6 py-2"}
          >
            {wait ? (
              <ImSpinner2 className="mx-auto text-xl animate-spin" />
            ) : (
              title
            )}
          </Button>
        </div>

        {errorMsg && (
          <span className="text-red-500 text-center mt-4 block">
            {errorMsg}
          </span>
        )}
      </div>
    </form>
  );
};

export default MoneyForm;
