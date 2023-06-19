import React, { useState } from "react";

const EditDistributorModal = ({ distributor, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({
    numero_serie_distributeur: distributor.numero_serie_distributeur,
    etat_distributeur: distributor.etat_distributeur,
    localisation_statique_distributeur:
      distributor.localisation_statique_distributeur,
    // Add other properties of the distributor as needed
  });

  const handleChange = (e) => {
    setEditedData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(editedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Modifier le distributeur</h2>
        <div>
          <label className="block mb-2">
            Numéro de série:
            <input
              type="text"
              name="numero_serie_distributeur"
              value={editedData.numero_serie_distributeur}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded-md w-full"
            />
          </label>
          <label className="block mb-2">
            État:
            <select
              name="etat_distributeur"
              value={editedData.etat_distributeur}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded-md w-full"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
              <option value="Hors service">Hors service</option>
              <option value="Déconnecté">Déconnecté</option>
            </select>
          </label>
          <label className="block mb-2">
            Localisation statique:
            <input
              type="text"
              name="localisation_statique_distributeur"
              value={editedData.localisation_statique_distributeur}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded-md w-full"
            />
          </label>
          {/* Add other input fields for other properties of the distributor */}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md mr-2"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDistributorModal;
