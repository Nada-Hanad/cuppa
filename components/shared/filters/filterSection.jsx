import { useState } from "react";
import FilterButton from "./filterButton";
import Input from "../inputs/input";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilterSection({
  placeholders,
  data,
  setData,
  attribute,
}) {
  const warnEmpty = () => toast.warn("Veuillez remplir les deux champs!");

  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  function onFilter() {
    if (!first || !second) {
      warnEmpty();
      return;
    }
    const newData = data.filter((item) => {
      return item[attribute] >= first && item[attribute] <= second;
    });

    setData(newData);
  }

  return (
    <>
      <ToastContainer />

      <Input
        placeholder={placeholders.first}
        value={first}
        setValue={setFirst}
      />
      <Input
        placeholder={placeholders.second}
        value={second}
        setValue={setSecond}
      />
      <FilterButton onClick={onFilter} />
    </>
  );
}
