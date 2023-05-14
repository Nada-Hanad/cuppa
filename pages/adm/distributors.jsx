import Head from "next/head";
import DistributorCard from "../../components/ADM/distributorCard";
import FilterButton from "../../components/shared/filterButton";
import Input from "../../components/shared/input";
import SearchBar from "../../components/shared/searchBar";
import Title from "../../components/shared/title";
import { useState } from "react";
import AddDistributorModal from "../../components/ADM/addDistributor";

export default function Distributors() {
  const [status, setStatus] = useState("all"); // default value is 'all'

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const defaultDis = [
    {
      _id: 0,
      numero_serie_distributeur: "D0001",
      etat_distributeur: "Actif",
      date_installation_distributeur: "2022-03-15",
      localisation_statique_distributeur: "Paris, France",
    },
    {
      _id: 1,
      numero_serie_distributeur: "D0002",
      etat_distributeur: "Inactive",
      date_installation_distributeur: "2021-09-10",
      localisation_statique_distributeur: "New York, USA",
    },
    {
      _id: 2,
      numero_serie_distributeur: "D0003",
      etat_distributeur: "Actif",
      date_installation_distributeur: "2022-01-25",
      localisation_statique_distributeur: "London, UK",
    },
    {
      _id: 3,
      numero_serie_distributeur: "D0004",
      etat_distributeur: "Actif",
      date_installation_distributeur: "2022-02-18",
      localisation_statique_distributeur: "Tokyo, Japan",
    },
    {
      _id: 4,
      numero_serie_distributeur: "D0005",
      etat_distributeur: "Inactive",
      date_installation_distributeur: "2020-12-05",
      localisation_statique_distributeur: "Sydney, Australia",
    },
  ];
  const [distributors, setDistributors] = useState(defaultDis);
  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Distributeurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Distributeurs" />
      <AddDistributorModal
        distributors={distributors}
        setDistributors={setDistributors}
      />

      <div className="flex my-8 justify-between h-full gap-10">
        <SearchBar
          placeholder={"Numéro de serie..."}
          handleSearch={handleSearchChange}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="font-medium text-gray-700">
            Etat:
          </label>
          <div className="relative">
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="appearance-none w-full py-2 pl-3 pr-8 text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">Tous</option>
              <option value="actif">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 14.707a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L10 12.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <FilterButton
          onClick={() => {
            if (status === "all") {
              setDistributors(defaultDis);
            } else {
              setDistributors(
                defaultDis.filter((distributor) =>
                  distributor.etat_distributeur
                    .toLowerCase()
                    .includes(status.toLowerCase())
                )
              );
            }
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-12">
        {distributors
          .filter((distributor) =>
            distributor.numero_serie_distributeur
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((distributor) => (
            <DistributorCard
              key={distributor.numero_serie_distributeur}
              distributor={distributor}
            />
          ))}
      </div>
    </div>
  );
}
