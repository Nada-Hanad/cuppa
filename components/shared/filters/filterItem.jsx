import Image from "next/image";
import { useEffect, useState } from "react";

export default function FilterItem({
  placeholders,
  data,
  setData,
  attributeListToCompare,
  attributeListToShow,
  attributeData,
  list,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const handleFilter = (filt) => {
    const newdata = data.filter((item) => item[attributeData] == filt);

    setData(newdata);
  };
  return (
    <div
      onClick={() => setOpen(!open)}
      className="h-12   px-6 relative cursor-pointer   bg-dark-grey rounded text-white flex items-center justify-center gap-4"
    >
      <p>{selected || placeholders}</p>
      <Image
        src="/icons/dropDownIcon.svg"
        alt="drop down icon"
        width={30}
        height={30}
      />
      {open && (
        <div className="absolute top-12 left-0 flex w-full py-2 flex-col items-center justify-start text-dark text-[16px] text-bold bg-slate-300 rounded shadow-lg">
          {list?.map((item, idx) => (
            <p
              className="p-1 text-bold    border-0 border-b border-b-orange-400"
              key={idx}
              onClick={(e) => {
                handleFilter(item[attributeListToCompare]);
                setSelected(item[attributeListToShow]);
              }}
            >
              {item[attributeListToShow]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
