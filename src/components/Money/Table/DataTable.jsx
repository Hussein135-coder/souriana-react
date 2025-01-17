/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import useDataContext from "../../../hooks/useDataContext";
import Button from "../../Button";
import Card from "../../Card";
import { NumericFormat } from "react-number-format";
import EditMoney from "../Form/EditMoney";
import { useEffect, useState } from "react";
import DeleteMoney from "./DeleteMoney";
import { motion } from "framer-motion";

const DataTable = ({ selectedMoney, setSelectedMoney }) => {
  const { money, editMoney, user, deleteAllMoney } = useDataContext();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCheck, setSelectedCheck] = useState({
    id: 0,
    index: 0,
  });
  const [checkValues, setCheckValues] = useState([]);

  const handleEdit = (id) => {
    setSelectedId(id);
    setEditOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const updateCheckbox = async () => {
    await editMoney(
      { status: checkValues[selectedCheck.index] },
      user.token,
      selectedCheck.id,
      true
    );
  };

  const handleCheckboxChange = (id, index) => {
    console.log(id, index, checkValues[index]);
    setSelectedCheck({ id, index });
    const newChecks = [...checkValues];
    newChecks[index] = !checkValues[index];
    setCheckValues(newChecks);

    // Update Selected Money
    const newMoney = [...selectedMoney];
    newMoney[index].status = newChecks[index];
    console.log(newMoney, "new Money");
    setSelectedMoney(newMoney);
  };

  const handleDeleteAll = async (e) => {
    setIsLoading(true);
    try {
      const res = await deleteAllMoney(user.token);
      if (res.status == "success") {
        alert("تم الحذف بنجاح");
      } else {
        alert("حدث خطأ ما");
      }
    } catch (error) {
      console.log(error);
      alert("حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCheck.id == 0) {
      return;
    }
    updateCheckbox();
  }, [selectedCheck]);

  useEffect(() => {
    const boxesValues = selectedMoney?.map((item) => item.status);
    if (selectedMoney?.length != 0) {
      setCheckValues(boxesValues);
    }
  }, [selectedMoney]);

  const trs =
    selectedMoney?.length == 0 ? (
      <tr>
        <td colSpan="8" className="py-14 text-xl">
          <h3>لا يوجد حوالات</h3>
        </td>
      </tr>
    ) : (
      selectedMoney?.map((item, i) => {
        const { name, company, number, date } = item;
        return (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-gray-200 dark:border-gray-400 z-[-1]"
            key={item.id}
          >
            <td>{i + 1}</td>
            <td>{name}</td>
            <td style={{ direction: "ltr" }}>
              {
                <NumericFormat
                  value={number}
                  thousandSeparator=","
                  displayType="text"
                />
              }
            </td>
            <td>{company}</td>
            <td>{date}</td>
            <td className="h-[60.5px] flex justify-center items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded"
                checked={Number(checkValues[i])}
                onChange={() => handleCheckboxChange(item.id, i)}
              />
            </td>
            <td>
              <Button
                className="pt-2 pb-[2px] px-2"
                onClick={() => handleDelete(item.id)}
              >
                ❌
              </Button>
            </td>
            <td>
              <Button
                className="pt-2 pb-[2px] px-2"
                onClick={() => handleEdit(item.id)}
              >
                🖋
              </Button>
            </td>
          </motion.tr>
        );
      })
    );
  return (
    <>
      <Card className={"max-w-[700px] w-full overflow-x-auto mt-10 pt-8 px-5"}>
        {money?.length == 0 ? (
          <div className="min-h-[200px] flex justify-center items-center">
            <ImSpinner2 className="mx-auto text-xl animate-spin" />
          </div>
        ) : (
          <table className="w-full text-center pt-5">
            <thead>
              <tr className="border-b border-b-  border-gray-400">
                <th>#</th>
                <th>الاسم</th>
                <th>المبلغ</th>
                <th>الشركة</th>
                <th>التاريخ</th>
                <th>الحالة</th>
                <td>حذف</td>
                <td>تعديل</td>
              </tr>
            </thead>
            <tbody>{trs}</tbody>
          </table>
        )}

        <Button
          onClick={handleDeleteAll}
          type="button"
          disabled={isLoading}
          className={"py-2 px-3 mb-3"}
        >
          {isLoading ? (
            <ImSpinner2 className="mx-auto text-xl animate-spin" />
          ) : (
            "حذف الكل"
          )}
        </Button>
      </Card>
      <EditMoney
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        selectedId={selectedId}
      />
      <DeleteMoney
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        selectedId={selectedId}
      />
    </>
  );
};

export default DataTable;
