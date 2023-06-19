import React, { useState } from "react";
import Head from "next/head";
import StateFilter from "../../components/shared/filters/stateFilter";
import Title from "../../components/shared/layout/title";
import Image from "next/image";
import SearchBar from "../../components/shared/search/searchBar";
import LocationMap from "../../components/DECIDEUR/map";
import ProgressBar from "../../components/shared/progressBars/basicProgressBar";
import distributorsData from "../../helpers/mocks/distributors.json";

export default function DeciderDistributors() {
  const states = [
    { label: "Actif", value: "Actif", color: "green-500" },
    { label: "Inactif", value: "Inactif", color: "red-500" },
    { label: "Hors service", value: "Hors service", color: "yellow-500" },
    { label: "Déconnecté", value: "Déconnecté", color: "gray-500" },
  ];

  const defaultDistributors = distributorsData;

  const [distributors, setDistributors] = useState(defaultDistributors);
  const [selectedDistributor, setSelectedDistributor] = useState(
    defaultDistributors[0]
  );

  const handleStateSelect = (selectedStates) => {
    if (selectedStates.length === 0) {
      // No states selected, set distributors to defaultDistributors
      setDistributors(defaultDistributors);
    } else {
      // Filter the distributors based on the selected states
      const filteredDistributors = defaultDistributors.filter((distributor) =>
        selectedStates.includes(distributor.etat_distributeur)
      );

      // Update the distributors state
      setDistributors(filteredDistributors);
    }
  };
  const handleDistributorSelect = (distributor) => {
    setSelectedDistributor(distributor);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setDistributors(
      defaultDistributors.filter((e) =>
        e.numero_serie_distributeur.toLowerCase().includes(value?.toLowerCase())
      )
    );
  };

  return (
    <div className="text-center pt-8 flex flex-col items-center h-screen">
      <Head>
        <title>Distributeurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Distributeurs" />
      <SearchBar
        placeholder={"Numéro de série..."}
        handleSearch={handleSearchChange}
      />
      <StateFilter onSelect={handleStateSelect} states={states} />
      <div className="w-full flex gap-8 items-center h-2/3">
        <div className="w-2/5 h-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
          <ul className="space-y-2">
            <div className="p-3 bg-dark-grey text-white rounded w-full flex justify-between">
              <p>Numéro de série</p>
              <p>État</p>
            </div>

            {distributors.map((distributor) => (
              <li
                key={distributor.numero_serie_distributeur}
                className={`flex items-center justify-between cursor-pointer p-2 rounded hover:bg-blue-100 ${
                  selectedDistributor.numero_serie_distributeur ===
                  distributor.numero_serie_distributeur
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => handleDistributorSelect(distributor)}
              >
                <span className="mr-2">
                  {distributor.numero_serie_distributeur}
                </span>
                <span
                  className={`text-${
                    states.find(
                      (state) => state.value === distributor.etat_distributeur
                    )?.color
                  }`}
                >
                  {distributor.etat_distributeur}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {selectedDistributor && (
          <div className="w-3/5 h-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4 flex flex-col justify-between">
            <div className="p-3 bg-dark-grey text-white rounded w-full flex justify-center">
              <p>Détails du distributeur</p>
            </div>
            <div
              key={selectedDistributor.numero_serie_distributeur}
              className={`flex items-center justify-between cursor-pointer p-2 rounded border-2 border-${
                states.find(
                  (state) =>
                    state.value === selectedDistributor.etat_distributeur
                )?.color
              }`}
            >
              <span className="mr-2">
                {selectedDistributor.numero_serie_distributeur}
              </span>
              <span
                className={`text-${
                  states.find(
                    (state) =>
                      state.value === selectedDistributor.etat_distributeur
                  )?.color
                }`}
              >
                {selectedDistributor.etat_distributeur}
              </span>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-1/2 h-48 rounded overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <LocationMap />
              </div>
              <div className="p-2 w-1/2 bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3">
                <div className="p-3 bg-dark-grey text-white rounded">
                  {"Taux d'utilisation"}
                </div>
                <div className="flex justify-center items-center py-8">
                  <p className="text-2xl">
                    {selectedDistributor.utilizationRate * 100}%
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="p-2 w-1/2 bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3">
                <div className="p-3 bg-dark-grey text-white rounded">
                  Nº de requetes de maintenance
                </div>
                <div className="flex justify-center items-center py-8">
                  <p className="text-2xl">
                    {selectedDistributor.maintenanceRequests}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
