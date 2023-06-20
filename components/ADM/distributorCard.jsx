import Image from "next/image";
import Link from "next/link";
import EditDistributorModal from "./editDistributorModal";
import { useState } from "react";

export default function DistributorCard({
  distributor,
  onDelete,
  all,
  setAll,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalSave = (editedData) => {
    let newArray = [...all];
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i]._id === distributor._id) {
        newArray[i] = editedData;
        break;
      }
    }
    setAll(newArray);

    console.log("Edited Data:", editedData);
    setIsEditModalOpen(false);
  };
  const getStateColor = (state) => {
    switch (state) {
      case "Actif":
        return "text-green-600";
      case "Inactif":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleDelete = () => {
    // Perform delete logic here
    // You can pass the distributor ID to onDelete function or perform any other necessary operations

    setAll(all.filter((e) => e._id !== distributor._id));
  };

  return (
    <div className="h-[350px] w-80 rounded bg-white p-[10px] text-start flex flex-col justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative">
      <div className="absolute top-4 right-4">
        <button
          className="bg-white rounded-full h-8 w-8 grid items-center shadow-md hover:bg-red-300 hover:text-white transition-colors duration-300"
          onClick={handleDelete}
        >
          <Image
            height={30}
            width={30}
            alt="Delete icon"
            src="/icons/deleteIcon.svg"
          />
        </button>
      </div>
      <div className="absolute top-4 right-16">
        <button
          className="bg-white rounded-full h-8 w-8 grid items-center shadow-md  transition-colors duration-300"
          onClick={handleEdit}
        >
          <Image
            className="rounded-full"
            height={30}
            width={30}
            alt="Delete icon"
            src="/icons/editIcon.svg"
          />
        </button>
      </div>

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
      {isEditModalOpen && (
        <EditDistributorModal
          distributor={distributor}
          onClose={handleEditModalClose}
          onSave={handleEditModalSave}
        />
      )}
    </div>
  );
}
