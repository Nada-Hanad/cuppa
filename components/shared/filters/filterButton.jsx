import Image from "next/image";

export default function FilterButton({ onClick }) {
  return (
    <div
      className="bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-dark-grey px-4 py-2 flex gap-4  w-fit items-center cursor-pointer   transition-all "
      onClick={onClick}
    >
      <Image
        height={20}
        width={20}
        src="/icons/filter.svg"
        alt="Filter icon"
      ></Image>
      Filtrer
    </div>
  );
}
