import React, { useState } from "react";
import EditDistributorModal from "./editDistributorModal";

const DistributorListItem = ({ distributor, all, setAll }) => {
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

  const handleDelete = () => {
    // Perform delete logic here
    // You can pass the distributor ID to onDelete function or perform any other necessary operations
    setAll(all.filter((e) => e._id !== distributor._id));
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

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-300 w-full">
      <div className="flex flex-col w-32">
        <h3 className="text-lg font-medium">
          {distributor.numero_serie_distributeur}
        </h3>
        <p className="text-sm text-gray-500">
          {distributor.localisation_statique_distributeur}
        </p>
      </div>
      <div className="flex items-center justify-center flex-shrink-0">
        <span
          className={`text-sm ${getStateColor(distributor.etat_distributeur)}`}
        >
          {distributor.etat_distributeur}
        </span>
      </div>
      <span className="text-xs text-gray-400">
        {distributor.date_installation_distributeur}
      </span>
      <div className="flex items-center justify-center space-x-2">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleEdit}
        >
          Modifier
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>
      {isEditModalOpen && (
        <EditDistributorModal
          distributor={distributor}
          all={all}
          setAll={setAll}
          onClose={handleEditModalClose}
          onSave={handleEditModalSave}
        />
      )}
    </div>
  );
};

export default DistributorListItem;
