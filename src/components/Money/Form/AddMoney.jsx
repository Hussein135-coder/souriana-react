import { useMemo, useState } from "react";
import Button from "../../Button";
import Modal from "../../Modal";
import useDataContext from "../../../hooks/useDataContext";
import MoneyForm from "./MoneyForm";

const AddMoney = () => {
  const { user, addMoney } = useDataContext();
  const [isOpen, setIsOpen] = useState();
  const [clicked, setClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const initData = useMemo(() => {
    return {
      name: "",
      number: "",
      company: "",
      date: "",
      status: true,
      user: user.username,
    };
  }, []);

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setClicked(true);
    if (valid) {
      const res = await addMoney(data, user.token);

      if (res.status == "success") {
        setIsOpen(false);
        setClicked(false);
      } else {
        setErrorMsg("حدث خطأ ما");
      }
    }
  };

  console.log(valid, "valiiid");

  return (
    <>
      <div className="mt-2">
        <Button type="button" onClick={handleOpen} className="px-3 py-2">
          إضافة حوالة
        </Button>
      </div>

      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <MoneyForm
            initData={initData}
            handleSubmit={handleSubmit}
            title={"إضافة"}
            errorMsg={errorMsg}
            clicked={clicked}
            setValid={setValid}
            valid={valid}
          />
        </Modal>
      )}
    </>
  );
};

export default AddMoney;
