/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../Modal";
import useDataContext from "../../../hooks/useDataContext";
import { ImSpinner2 } from "react-icons/im";
import { AiFillQuestionCircle } from "react-icons/ai";
import Button from "../../Button";

const DeleteMoney = ({ isOpen, setIsOpen, selectedId }) => {
  const { user, deleteMoney, wait } = useDataContext();

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await deleteMoney(user.token, selectedId);
    if (res.status == "success") {
      setIsOpen(false);
    } else {
      setErrorMsg("حدث خطأ ما");
    }
  };

  return (
    <>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <form onSubmit={handleSubmit}>
            <h3 className="py-5 text-center sm:text-2xl ">
              هل أنت متأكد من أنك تريد حذف الحوالة
            </h3>
            <AiFillQuestionCircle className=" text-7xl sm:text-8xl mx-auto mb-4" />
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                إغلاق
              </Button>

              <Button type="submit" className="p-2">
                {wait ? (
                  <ImSpinner2 className="mx-auto text-xl animate-spin" />
                ) : (
                  "موافق"
                )}
              </Button>
            </div>
            {errorMsg && <span>{errorMsg}</span>}
          </form>
        </Modal>
      )}
    </>
  );
};

export default DeleteMoney;
