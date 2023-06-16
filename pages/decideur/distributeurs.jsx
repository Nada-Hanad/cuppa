import React, { useState } from "react";
import Head from "next/head";
import StateFilter from "../../components/shared/filters/stateFilter";
import Title from "../../components/shared/layout/title";
import Image from "next/image";
import SearchBar from "../../components/shared/search/searchBar";
import LocationMap from "../../components/DECIDEUR/map";
import ProgressBar from "../../components/shared/progressBars/basicProgressBar";

export default function DeciderDistributors() {
  function handleSearchChange() {}
  const states = [
    { label: "Actif", value: "active", color: "green-500" },
    { label: "Inactif", value: "inactive", color: "red-500" },
    {
      label: "Hors service",
      value: "out-of-service",
      color: "yellow-500",
    },
    { label: "Déconnecté", value: "disconnected", color: "gray-500" },
  ];

  const defaultDistributors = [
    {
      serialNumber: "12345",
      state: "active",
      location: "Paris, France",
      photo:
        "https://images.unsplash.com/photo-1686693418712-9a839229a3f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      ingredientLevels: {
        ingredient1: 80,
        ingredient2: 50,
        ingredient3: 30,
      },
      waterTemperature: 25,
    },
    {
      serialNumber: "67890",
      state: "inactive",
      location: "Marseille, France",
      photo:
        "https://images.unsplash.com/photo-1686693418712-9a839229a3f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      ingredientLevels: {
        ingredient1: 60,
        ingredient2: 40,
        ingredient3: 20,
      },
      waterTemperature: 30,
    },
    // Add more distributor objects as needed
  ];

  const [distributors, setDistributors] = useState(defaultDistributors);
  const [selectedDistributor, setSelectedDistributor] = useState(
    defaultDistributors[0]
  );

  const handleStateSelect = (state) => {
    // Handle the selected state
    console.log("Selected state:", state);
  };

  const handleDistributorSelect = (distributor) => {
    setSelectedDistributor(distributor);
  };

  return (
    <div className="text-center pt-8 flex flex-col items-center h-screen">
      <Head>
        <title>Distributeurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Distributeurs" />
      <SearchBar
        placeholder={"Numéro de serie..."}
        handleSearch={handleSearchChange}
      />
      <StateFilter onSelect={handleStateSelect} states={states} />
      <div className="w-full flex gap-8 items-center h-2/3">
        <div className="w-2/5 h-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
          <ul className="space-y-2">
            <div className="p-3 bg-dark-grey text-white rounded w-full flex justify-between">
              <p>Numero de serie</p>
              <p>Etat</p>
            </div>
            {distributors.map((distributor) => (
              <li
                key={distributor.serialNumber}
                className={` flex items-center justify-between cursor-pointer p-2 rounded hover:bg-blue-100 ${
                  selectedDistributor.serialNumber === distributor.serialNumber
                    ? " bg-blue-100"
                    : ""
                }`}
                onClick={() => handleDistributorSelect(distributor)}
              >
                <span className="mr-2">{distributor.serialNumber}</span>
                <span
                  className={`text-${
                    states.find((state) => state.value === distributor.state)
                      ?.color
                  }`}
                >
                  {distributor.state}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {selectedDistributor && (
          <div className="w-3/5 h-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4 flex flex-col justify-between">
            <div className="p-3 bg-dark-grey text-white rounded w-full flex justify-center">
              <p>Details de distributeur</p>
            </div>
            <div
              key={selectedDistributor.serialNumber}
              className={` flex items-center justify-between cursor-pointer p-2 rounded border-2 border-${
                states.find(
                  (state) => state.value === selectedDistributor.state
                )?.color
              }`}
            >
              <span className="mr-2">{selectedDistributor.serialNumber}</span>
              <span
                className={`text-${
                  states.find(
                    (state) => state.value === selectedDistributor.state
                  )?.color
                }`}
              >
                {selectedDistributor.state}
              </span>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-1/2 h-48  rounded overflow-hidden">
                <LocationMap />
              </div>

              <Image
                height={100}
                width={100}
                src={selectedDistributor.photo}
                alt="Distributor Photo"
                className="w-1/2 h-48  object-cover rounded"
              />
            </div>
            <div className="w-full bg-bg-grey rounded flex p-4 justify-around">
              <div className="flex flex-col gap-2">
                {" "}
                <div className="flex">
                  <p>Cafe</p>&nbsp;
                  <ProgressBar
                    percentage={
                      selectedDistributor.ingredientLevels.ingredient1
                    }
                    color={
                      selectedDistributor.ingredientLevels.ingredient1 > 50
                        ? "green-500"
                        : "red-500"
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p>Lait</p>&nbsp;
                  <ProgressBar
                    percentage={
                      selectedDistributor.ingredientLevels.ingredient2
                    }
                    color={
                      selectedDistributor.ingredientLevels.ingredient2 > 50
                        ? "green-500"
                        : "red-500"
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p>Thé</p>&nbsp;
                  <ProgressBar
                    percentage={
                      selectedDistributor.ingredientLevels.ingredient3
                    }
                    color={
                      selectedDistributor.ingredientLevels.ingredient3 > 50
                        ? "green-500"
                        : "red-500"
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p>Sucre</p>&nbsp;
                  <ProgressBar
                    percentage={
                      selectedDistributor.ingredientLevels.ingredient1
                    }
                    color={
                      selectedDistributor.ingredientLevels.ingredient1 > 50
                        ? "green-500"
                        : "red-500"
                    }
                  />
                </div>
              </div>
              <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-red-500 rounded p-4 w-40 flex flex-col justify-center items-center">
                <p>Eau </p>
                <p>{selectedDistributor.waterTemperature}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
