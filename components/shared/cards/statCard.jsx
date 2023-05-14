import Image from "next/image";

export default function StatCard({ icon, title, stat }) {
  return (
    <div className="h-48 w-full bg-dark-grey relative p-4 text-white rounded-2xl">
      <Image width={48} height={48} src={icon} alt="icon"></Image>
      <h2>{title}</h2>
      <h3 className="absolute bottom-4 right-4">{stat}</h3>
    </div>
  );
}
