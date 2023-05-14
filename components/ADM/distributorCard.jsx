import Image from "next/image";
import Link from "next/link";

export default function DistributorCard({ distributor }) {
  // Define a function to get the color based on distributor's state
  const getStateColor = (state) => {
    switch (state) {
      case "Active":
        return "text-green-600";
      case "Inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="h-[350px] w-80 rounded-xl bg-white p-[10px] text-start flex flex-col justify-between">
      <Image
        src="/placeholders/distributeur.jpg"
        alt="distributor's pic"
        height={200}
        width={500}
        className="h-2/3 w-full overflow-hidden object-cover rounded"
      />

      <h2 className="font-bold">{distributor.numero_serie_distributeur}</h2>
      <p>
        <span className="font-bold">Etat: </span>
        <span className={getStateColor(distributor.etat_distributeur)}>
          {distributor.etat_distributeur}
        </span>
      </p>
      <Link href={`/adm/distributors/${distributor._id}`}>
        <button className="py-2 px-4 bg-dark w-fit rounded text-white self-end">
          Voir plus
        </button>
      </Link>
    </div>
  );
}
