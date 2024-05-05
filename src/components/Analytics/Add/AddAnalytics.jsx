import { useRef, useState } from "react";
import Button from "../../Button";
import Modal from "../../Modal";
import useDataContext from "../../../hooks/useDataContext";
import AnalyticsForm from "./AnalyticsForm";

const AddAnalytics = () => {
  const { user, addAnalytics } = useDataContext();
  const [isOpen, setIsOpen] = useState();
  const [clicked, setClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);
  const pageRef = useRef();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setClicked(true);
    if (valid) {
      const select = pageRef.current;
      const name = select.selectedOptions[0].text;
      const page = select.value;
      const analytic = { ...data, name: name };
      console.log(page);
      console.log(analytic);
      const res = await addAnalytics(analytic, user.token, page);

      if (res.status == "success") {
        setIsOpen(false);
        setClicked(false);
      } else {
        setErrorMsg("حدث خطأ ما");
      }
    }
  };

  return (
    <>
      <div className="mt-10">
        <Button type="button" onClick={handleOpen} className="px-3 py-2">
          إضافة
        </Button>
      </div>

      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <AnalyticsForm
            handleSubmit={handleSubmit}
            errorMsg={errorMsg}
            clicked={clicked}
            setValid={setValid}
            valid={valid}
            page={pageRef}
          />
        </Modal>
      )}
    </>
  );
};

export default AddAnalytics;
