import Head from "next/head";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faTableCells,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddBoissonModal from "../../components/AC/boissons/addBoisson";
import BoissonCard from "../../components/AC/boissons/boissonsCard";
import DistributorCard from "../../components/ADM/distributorCard";
import FilterButton from "../../components/shared/filters/filterButton";
import FilterSection from "../../components/shared/filters/filterSection";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import Title from "../../components/shared/layout/title";
import EditBoissonModal from "../../components/AC/boissons/editBoissonModal";
import axios from "axios";
import { DEPLOY_URL } from "../../config/api";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export default function Boissons() {
  const [defaultData, setDefaultData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tableView, setTableView] = useState(true);

  // Function to toggle between table view and card view
  const toggleTableView = () => {
    setTableView((prevState) => !prevState);
  };

  // Default data for drinks

  // Function to handle search input
  function handleSearch(enteredWord) {
    const searchTerms = enteredWord.toLowerCase().split(" ");
    const filteredDrinks = defaultData.filter((drink) => {
      const nameLower = drink.name.toLowerCase();
      return searchTerms.every((term) => nameLower.includes(term));
    });
    setDrinks(filteredDrinks);
  }
  function structureResult(response) {
    const result = [];
    response.forEach((drink) => {
      result.push({
        id: drink.id_boisson,
        name: drink.libelle_boisson,
        price: drink.prix_boisson,
        time: drink.duree_preparation_boisson,
        description: drink.description_boisson,

        ingredients: [
          { name: "espresso", quantity: 10 },
          { name: "steamed milk", quantity: 10 },
          { name: "foamed milk", quantity: 10 },
        ],
        image: `${DEPLOY_URL}/${drink.path_image_boisson}`,
      });
    });
    return result;
  }
  const [drinks, setDrinks] = useState(defaultData);
  function fetchAllData() {
    axios
      .get(DEPLOY_URL + "/boissons")
      .then((res) => {
        setDrinks(structureResult(res.data));
        setDefaultData(structureResult(res.data));
      })
      .catch((err) => {
        toast.error("Une erreur s'est produite!");
      })
      .finally(() => {
        setLoading(false); // Update loading state
      });
  }
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Boissons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Boissons" />

      <AddBoissonModal drinks={drinks} setDrinks={setDrinks} />

      <div className="flex my-8 justify-between h-full gap-10 relative">
        <select
          className="py-2 px-4 rounded absolute top-[-80px] right-40 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          value={tableView ? "list" : "grid"}
          onChange={(e) => {
            if (e == "list") {
              toggleTableView(true);
            } else {
              toggleTableView(false);
            }
          }}
        >
          <option value="grid">Grid View</option>
          <option value="list">List View</option>
        </select>
        <SearchBar
          placeholder={"Nom de la boisson..."}
          handleSearch={handleSearch}
        />
        <FilterSection
          placeholders={{
            first: "prix min...",
            second: "prix max...",
          }}
          data={defaultData}
          setData={setDrinks}
          attribute={"price"}
        />
      </div>

      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : tableView ? (
        // Table view
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>{" "}
              {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {drinks.map((drink, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b">{drink.id}</td>
                <td className="py-2 px-4 border-b">{drink.name}</td>
                <td className="py-2 px-4 border-b">{drink.price}</td>

                <td className="py-2 px-4 border-b">
                  <EditBoissonModal
                    drink={drink}
                    drinks={drinks}
                    setDrinks={setDrinks}
                  />

                  <button
                    className="ml-4 self-center px-4 py-2 text-red-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded bg-white "
                    type="button"
                    onClick={() => {}}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {drinks.map((drink, i) => (
            <BoissonCard
              key={i}
              drink={drink}
              drinks={drinks}
              setDrinks={setDrinks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
