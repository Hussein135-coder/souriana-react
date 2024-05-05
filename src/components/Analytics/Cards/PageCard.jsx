/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import Card from "../../Card";
import { useEffect, useState } from "react";
import useDataContext from "../../../hooks/useDataContext";
import { NumericFormat } from "react-number-format";

const PageCard = ({ image, title, likes, endPoint, date }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  const { getAnalytics, analytics, user } = useDataContext();

  const handleLoading = () => {
    setImageLoading(false);
  };

  const getPageAnalytics = async () => {
    setDataLoading(true);
    try {
      const res = await getAnalytics(user.token, endPoint);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (analytics.syredu.length == 0) {
      getPageAnalytics();
    }
  }, []);

  return (
    <Card className={"p-6 text-center relative"}>
      {dataLoading ? (
        <ImSpinner2 className="mx-auto text-xl text-gray-100 animate-spin" />
      ) : (
        <>
          <h3 className="text-lg pb-4  font-medium">{title}</h3>
          {imageLoading && (
            <ImSpinner2 className="mx-auto text-xl text-gray-100 animate-spin" />
          )}
          <img
            src={image}
            onLoad={handleLoading}
            onError={handleLoading}
            className="w-full rounded mx-auto"
            alt={title}
          />
          <p className="pb-5 pt-4 text-lg">
            /
            {
              <NumericFormat
                className="px-1"
                value={likes}
                thousandSeparator=","
                displayType="text"
              />
            }
            إعجاب /
          </p>
          <p className="bg-gray-100 text-gray-800 w-full text-base font-bold pb-1 pt-2 absolute bottom-0 right-0 ">
            {date}
          </p>
        </>
      )}
    </Card>
  );
};

export default PageCard;
