import Head from "next/head";
import DistributorCard from "../../components/ADM/distributorCard";
import FilterButton from "../../components/shared/filters/filterButton";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import Title from "../../components/shared/layout/title";
import { useState } from "react";
import AddDistributorModal from "../../components/ADM/addDistributor";
import DistributorListItem from "../../components/ADM/distributorListItem";
import defaultDis from "../../helpers/mocks/distributors.json";

export default function Distributors() {
  const [status, setStatus] = useState("all"); // Valeur par défaut : 'all'
  const [view, setView] = useState("grid"); // Valeur par défaut : 'grid'

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const [distributors, setDistributors] = useState(defaultDis);

  return (
    <div className="text-center pt-8 flex flex-col items-center pb-12">
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
          placeholder={"Numéro de série..."}
          handleSearch={handleSearchChange}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="font-medium text-gray-700">
            État :
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
              <option value="inactif">Inactif</option>
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
        <div className="flex items-center space-x-2">
          <label htmlFor="view" className="font-medium text-gray-700">
            Vue :
          </label>
          <div className="relative">
            <select
              id="view"
              value={view}
              onChange={handleViewChange}
              className="appearance-none w-full py-2 pl-3 pr-8 text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="grid">Grille</option>
              <option value="list">Liste</option>
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
              console.log(status);
              setDistributors(
                defaultDis.filter(
                  (distributor) =>
                    distributor.etat_distributeur.toLowerCase() ==
                    status.toLowerCase()
                )
              );
            }
          }}
        />
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-12">
          {distributors
            .filter((distributor) =>
              distributor.numero_serie_distributeur
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((distributor) => (
              <DistributorCard
                all={distributors}
                setAll={setDistributors}
                key={distributor.numero_serie_distributeur}
                distributor={distributor}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full px-24">
          <div className="flex items-center justify-between py-4 border-b border-gray-300 w-full">
            <div className="flex flex-col w-32">
              <h3 className="text-lg font-medium">N Série </h3>
              <p className="text-sm text-gray-500">Localisation</p>
            </div>
            <div className="ml-[10px]">
              <span>Etat</span>
            </div>
            <span>{"Date d'installation"}</span>
            <div className="flex items-center justify-start w-24 ">Actions</div>
          </div>

          {distributors
            .filter((distributor) =>
              distributor.numero_serie_distributeur
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((distributor) => (
              <DistributorListItem
                all={distributors}
                setAll={setDistributors}
                key={distributor.numero_serie_distributeur}
                distributor={distributor}
              />
            ))}
        </div>
      )}
    </div>
  );
}
