import React, { useState } from "react";
import Head from "next/head";
import Title from "../../components/shared/layout/title";
import Image from "next/image";
import SearchBar from "../../components/shared/search/searchBar";
import LocationMap from "../../components/DECIDEUR/map";
import ProgressBar from "../../components/shared/progressBars/basicProgressBar";
import ChartFilter from "../../components/shared/filters/timeFilter";

export default function DeciderFinance() {
  function handleSearchChange() {}

  const defaultDistributors = [
    {
      serialNumber: "12345",
      revenue: 5000,
      location: "Paris, France",
      ingredientLevels: {
        ingredient1: 80,
        ingredient2: 50,
        ingredient3: 30,
      },
      waterTemperature: 25,
    },
    {
      serialNumber: "67890",
      revenue: 3000,
      location: "Marseille, France",
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

  const handleDistributorSelect = (distributor) => {
    setSelectedDistributor(distributor);
  };

  return (
    <div className="text-center pt-8 flex flex-col items-center h-screen">
      <Head>
        <title>Finance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Finance" />

      <div className="w-full flex gap-8 items-center h-2/3">
        <div className="w-2/5 h-full flex flex-col gap-8">
          <SearchBar
            placeholder={"Numéro de serie..."}
            handleSearch={handleSearchChange}
          />
          <div className=" w-full h-4/5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
            <ul className="space-y-2">
              <div className="p-3 bg-dark-grey text-white rounded w-full flex justify-between">
                <p>Numero de serie</p>
                <p>Revenue</p>
              </div>
              {distributors.map((distributor) => (
                <li
                  key={distributor.serialNumber}
                  className={`flex items-center justify-between cursor-pointer p-2 rounded hover:bg-blue-100 ${
                    selectedDistributor.serialNumber ===
                    distributor.serialNumber
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() => handleDistributorSelect(distributor)}
                >
                  <span className="mr-2">{distributor.serialNumber}</span>
                  <span>{distributor.revenue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedDistributor && (
          <div className="w-3/5 h-full flex flex-col gap-10 items-center">
            <ChartFilter />
            <div className="w-full h-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4 flex flex-col justify-between">
              <div
                key={selectedDistributor.serialNumber}
                className="cursor-pointer p-2 rounded border-2 border-black"
              >
                <span className="mr-2">{selectedDistributor.serialNumber}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
