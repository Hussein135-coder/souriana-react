/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../Modal";
import useDataContext from "../../../hooks/useDataContext";
import OneMoney from "./OneMoney";
import MoneyForm from "./MoneyForm";
import { ImSpinner2 } from "react-icons/im";

const EditMoney = ({ isOpen, setIsOpen, selectedId }) => {
  const { user, editMoney } = useDataContext();

  const [selectedMoney, setSelectedMoney] = useState();
  const [clicked, setClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setClicked(true);
    if (valid) {
      const res = await editMoney(data, user.token, selectedId);
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
      {isOpen && (
        <OneMoney setSelectedMoney={setSelectedMoney} selectedId={selectedId}>
          <Modal setIsOpen={setIsOpen}>
            {selectedMoney ? (
              <MoneyForm
                initData={selectedMoney}
                handleSubmit={handleSubmit}
                title={"تعديل"}
                errorMsg={errorMsg}
                clicked={clicked}
                setValid={setValid}
                valid={valid}
              />
            ) : (
              <ImSpinner2 className="mx-auto text-xl animate-spin" />
            )}
          </Modal>
        </OneMoney>
      )}
    </>
  );
};

export default EditMoney;
