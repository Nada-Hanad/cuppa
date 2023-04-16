import Image from "next/image";

export default function DistributorCard({ distributor }) {
  return (
    <div className="h-[350px] w-80 rounded-xl bg-white p-[10px] text-start flex flex-col justify-between">
      <Image
        src="/placeholders/distributeur.jpg"
        alt="distributor's pic"
        height={200}
        width={500}
        className="h-2/3 w-full overflow-hidden object-cover rounded"
      />

      <h2 className="font-bold">d name</h2>
      <p>Location</p>
      <button className="py-2 px-4 bg-dark w-fit rounded text-white self-end">
        Voir plus
      </button>
    </div>
  );
}
