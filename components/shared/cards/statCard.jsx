import Image from "next/image";

export default function StatCard({ icon, title, stat }) {
  return (
    <div className="flex flex-col gap-4 w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative p-4 text-white rounded">
      <div className="p-4 bg-dark-grey rounded flex justify-center gap-5 items-center">
        <Image width={25} height={25} src={icon} alt="icon"></Image>
        <h2>{title}</h2>
      </div>
      <h3 className="text-dark-grey text-2xl">{stat}</h3>
    </div>
  );
}
