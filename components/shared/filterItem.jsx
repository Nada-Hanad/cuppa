import Image from "next/image";

export default function FilterItem({ type, onClick }) {
  return (
    <div className="h-12 px-4 bg-dark-grey rounded-xl text-white flex items-center justify-center gap-4">
      <p>{type}</p>
      <Image
        src="/icons/dropDownIcon.svg"
        alt="drop down icon"
        width={30}
        height={30}
      />
    </div>
  );
}
