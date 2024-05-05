/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import useDataContext from "../../../hooks/useDataContext";
import Button from "../../Button";
import Card from "../../Card";
import { NumericFormat } from "react-number-format";
import EditMoney from "../Form/EditMoney";
import { useEffect, useRef, useState } from "react";
import DeleteMoney from "./DeleteMoney";
import { motion } from "framer-motion";

const DataTable = ({ selectedMoney }) => {
  const { money, editMoney, user, wait, pagination } = useDataContext();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const [selectedCheckId, setSelectedCheckId] = useState(0);
  const [checkValue, setCheckValue] = useState(null);
  const firstUpdate = useRef(true);

  const handleEdit = (id) => {
    setSelectedId(id);
    setEditOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };
  console.log(pagination, "pag");

  const CheckboxChange = async () => {
    const res = await editMoney(
      { status: checkValue },
      user.token,
      selectedCheckId,
      true
    );
    console.log(res);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    CheckboxChange();
  }, [selectedCheckId, checkValue]);

  const trs =
    selectedMoney.length == 0 ? (
      <tr>
        <td colSpan="8" className="py-14 text-xl">
          <h3>لا يوجد حوالات</h3>
        </td>
      </tr>
    ) : (
      selectedMoney?.map((item, i) => {
        const { name, company, number, date, status } = item.attributes;
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
              {selectedCheckId != item.id ? (
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  checked={Number(status)}
                  onChange={() => {
                    setSelectedCheckId(item.id);
                    setCheckValue((prev) => (prev ? !prev : !Number(status)));
                  }}
                />
              ) : wait ? (
                <ImSpinner2 className="mx-auto text-xl animate-spin" />
              ) : (
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  checked={Number(status)}
                  onChange={() => {
                    setSelectedCheckId(item.id);
                    setCheckValue((prev) => (prev ? !prev : !Number(status)));
                  }}
                />
              )}
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
        {money.length == 0 ? (
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
