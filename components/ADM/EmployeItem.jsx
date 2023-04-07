import Image from "next/image";

export default function EmployeItem() {
  return (
    <div className="w-full bg-white h-16 flex items-center justify-between px-4 border border-b-brown">
      <div className="h-12 w-12 bg-black rounded-full"></div>
      <p className="text-lg w-64">Nom</p>
      <p className="text-lg w-64">Type</p>
      <p className="text-lg w-64">Date</p>
      <div className="flex">
        <Image
          width={40}
          height={40}
          src="/icons/editIcon.svg"
          alt="edit icon"
        ></Image>
        <Image
          width={40}
          height={40}
          src="/icons/deleteIcon.svg"
          alt="edit icon"
        ></Image>
      </div>
    </div>
  );
}
