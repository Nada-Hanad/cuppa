import React, { useState } from "react";
import Head from "next/head";
import Title from "../../components/shared/layout/title";
import Image from "next/image";
import SearchBar from "../../components/shared/search/searchBar";
import LocationMap from "../../components/DECIDEUR/map";
import ProgressBar from "../../components/shared/progressBars/basicProgressBar";
import ChartFilter from "../../components/shared/filters/timeFilter";
import FinancialOverview from "../../components/DECIDEUR/financialOverview";
import financialData from "../../helpers/mocks/finance.json";
import RapportsFinanciers from "../../components/DECIDEUR/rapportsFinanciers";
import disData from "../../helpers/mocks/distributors.json";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

function FinCard({ header, value }) {
  return (
    <div className="p-2  bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3">
      <div className="p-3 bg-dark-grey text-white rounded">{header}</div>
      <div className="flex justify-center items-center py-8">
        <p className="text-2xl">{value} DA</p>
      </div>
    </div>
  );
}
export default function DeciderFinance() {
  const [loading, setLoading] = useState(true);
  const defaultDistributors = disData;

  const [distributors, setDistributors] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setDistributors(defaultDistributors);
      setLoading(false);
    }, 2000);
  }, []);

  const [selectedDistributor, setSelectedDistributor] = useState(
    defaultDistributors[0]
  );

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
    <div className="text-center pt-8 flex flex-col items-center pb-12">
      <Head>
        <title>Finance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Finance" />
      {loading ? (
        <div className="h-[700px] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="">
            <FinancialOverview financialData={financialData} />
            <RapportsFinanciers financialData={financialData} />
          </div>
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
                      <span>{distributor.revenue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {selectedDistributor && (
              <div className="w-3/5 h-full flex flex-col gap-10 items-center">
                <div className="gap-3 w-full h-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4 flex flex-col justify-between">
                  <div
                    key={selectedDistributor.numero_serie_distributeur}
                    className="cursor-pointer p-2 rounded border-2 border-black"
                  >
                    <span className="mr-2">
                      {selectedDistributor.numero_serie_distributeur}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-4">
                    <FinCard
                      header="Revenue"
                      value={selectedDistributor.revenue}
                    />
                    <FinCard header="Coût" value={selectedDistributor.costs} />
                    <FinCard
                      header="Profit"
                      value={selectedDistributor.profit}
                    />
                    <div className="p-2  bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3">
                      <div className="p-3 bg-dark-grey text-white rounded">
                        Croissance des ventes
                      </div>
                      <div className="flex justify-center items-center py-8">
                        <p className="text-2xl">
                          {selectedDistributor.salesGrowth * 100} %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
