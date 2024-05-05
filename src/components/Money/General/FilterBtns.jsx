/* eslint-disable react/prop-types */
import Button from "../../Button";

const FilterBtns = ({ filterMoney, selectedId, names }) => {
  const btns = names.map((name) => {
    const [engName] = Object.keys(name);
    return (
      <Button
        key={engName}
        onClick={() => filterMoney(engName)}
        type="button"
        active={engName === selectedId ? "bg-gray-700 text-white" : ""}
        className={"py-2 px-3"}
      >
        {name[engName]}
      </Button>
    );
  });

  return (
    <div className="m-auto w-max">
      <div className="flex gap-3">{btns}</div>
    </div>
  );
};

export default FilterBtns;
