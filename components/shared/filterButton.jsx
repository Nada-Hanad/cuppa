import Image from "next/image";

export default function FilterButton({ onClick }) {
  return (
    <div
      className="bg-white rounded-xl text-dark-grey px-4 py-2 flex gap-4 border-2 border-black w-fit items-center"
      onClick={onClick}
    >
      <Image
        height={30}
        width={30}
        src="/icons/filter.svg"
        alt="Filter icon"
      ></Image>
      Filtrer
    </div>
  );
}
