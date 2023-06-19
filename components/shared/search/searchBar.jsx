import Image from "next/image";
import { useState } from "react";

export default function SearchBar({ placeholder, handleSearch }) {
  const [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
    handleSearch(e.target.value);
  }
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-md p-2 w-96 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        value={value}
        onChange={handleChange}
      />
      <button
        className="p-2 h-12 w-12 flex items-center justify-center rounded-full bg-dark-grey"
        onClick={() => {
          handleSearch(value);
        }}
      >
        <Image
          height={20}
          width={20}
          src="/icons/search.svg"
          alt="sesrch icon"
        />
      </button>
    </div>
  );
}
