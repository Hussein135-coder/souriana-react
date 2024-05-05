/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import Button from "../../Button";
import useDataContext from "../../../hooks/useDataContext";
import { analyticsValidatioin } from "../../../helpers";
import Error from "../../Error";

const AnalyticsForm = ({ handleSubmit, errorMsg, clicked, setValid, page }) => {
  const { wait } = useDataContext();
  const [data, setData] = useState({
    name: "",
    likes: "",
    members: "",
    date: "",
  });

  // Handle Data
  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  // Erros Messages

  let facebookErrors = [],
    telegramErrors = [],
    dateErrors = [];

  // Validate Inputs
  analyticsValidatioin(data, facebookErrors, telegramErrors, dateErrors);

  useEffect(() => {
    if (
      facebookErrors.length == 0 &&
      telegramErrors.length == 0 &&
      dateErrors.length == 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data]);

  console.log(data);

  return (
    <form>
      <div className="w-full">
        {/* Page */}
        <div className="mb-2">
          <label className="block my-2 text-gray-100">الصفحة</label>
          <select
            defaultValue={"syredu"}
            ref={page}
            required
            className="block border w-full p-2 outline-none rounded mt-2 text-gray-900"
            name="name"
          >
            <option value={"syredu"}>سوريانا التعليمية</option>
            <option value={"bac"}>بكالوريا سوريا</option>
            <option value={"syr"}>سوريا التعليمية</option>
          </select>
        </div>

        {/* Number of Facebook */}
        <div className="mt-3 mb-2">
          <label className="block my-2 text-gray-100">إعجابات الفيسبوك</label>
          <input
            id="likes"
            type="number"
            name="likes"
            onChange={handleChange}
            className="p-2 rounded w-full text-gray-900 focus:outline-0 "
            placeholder="إعجابات الفيسبوك"
            aria-label="إعجابات الفيسبوك"
          />
        </div>
        {clicked && <Error errorsArr={facebookErrors} />}

        {/* Number of Telegram */}
        <div className="mt-3 mb-2">
          <label className="block my-2 text-gray-100">مشتركين التلغرام</label>
          <input
            id="members"
            type="number"
            name="members"
            onChange={handleChange}
            className="p-2 rounded w-full text-gray-900 focus:outline-0 "
            placeholder="مشتركين التلغرام"
            aria-label="مشتركين التلغرام"
          />
        </div>
        {clicked && <Error errorsArr={telegramErrors} />}

        {/* Date */}
        <div className="mb-2">
          <label className="block my-2 text-gray-100">التاريخ</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="p-2 rounded w-full text-gray-900 focus:outline-0"
            placeholder="التاريخ"
            aria-label="التاريخ"
          />
        </div>
        {clicked && <Error errorsArr={dateErrors} />}

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
              "إضافة"
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

export default AnalyticsForm;
