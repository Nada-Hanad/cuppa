import Head from "next/head";
import FilterButton from "../../components/shared/filters/filterButton";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import Title from "../../components/shared/layout/title";
import ValiderReclamation from "../../components/AC/validerReclamation";
import FilterItem from "../../components/shared/filters/filterItem";
import ReclamationCard from "../../components/AC/reclamationCard";
import { useAsyncDebounce } from "react-table";
//import Head from 'next/head';
import Image from "next/image";

import { DataTable } from "../../components/shared/tables/table";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useGlobalFilter, useTable } from "react-table";
//import SearchBar from '../../components/shared/search/searchBar';
import { API_URL, DEPLOY_URL } from "../../config/api";
import { SearchTableBar } from "../../components/shared/search/searchTableBar";
//import Title from '../../components/shared/layout/title';
import { useRouter } from "next/router";

export default function Reclamations() {
  ////////////---------------------- Dynamic table -------------------------------.----///////////////////////////////////////////////////////////////////////////////////////////////
  const router = useRouter();
  const [Reclamations, setReclamations] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const fetchReclamations = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(`${DEPLOY_URL}/reclamation/getAllReclamations/`, config)
      .catch((e) => console.log(e));
    if (response) {
      console.log(response);
      const reclamation = response.data;
      setReclamations(reclamation);
      setDefaultData(reclamation);
    }
  };
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);

    switch (buttonType) {
      case "Quality":
        setReclamations(
          defaultData.filter((d) => d.type_reclamation === "Quality")
        );
        break;
      case "Delivery":
        setReclamations(
          defaultData.filter((d) => d.type_reclamation === "Delivery")
        );
        break;
      case "Pending":
        setReclamations(
          defaultData.filter((d) => d.etat_reclamation === "Pending")
        );
        break;
      case "Not-Pending":
        setReclamations(
          defaultData.filter((d) => d.etat_reclamation === "Not-Pending")
        );
        break;
      default:
        setReclamations(defaultData.filter((d) => d.id_reclamation !== null));
        break;
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "ID Reclamation",
        accessor: "id_reclamation",
      },
      {
        Header: "Type",
        accessor: "type_reclamation",
      },
      {
        Header: "Date",
        accessor: "date_reclamation",
      },
      {
        Header: "Heure",
        accessor: "heure_reclamtion",
      },
      {
        Header: "Etat",
        accessor: "etat_reclamation",
      },
    ],
    []
  );
  //////////////////--------------API EXAMPLE----------------------//////////////////////////////////////////////////////////////////////////
  const distData = useMemo(() => [...Reclamations], [Reclamations]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Détails",
        Header: "",
        Cell: ({ row }) => {
          return (
            <button
              className="w-[100px] h-[50px] rounded-full bg-[#343A49] text-white flex items-center justify-center"
              onClick={() => {
                // Ajoutez ici la logique pour rediriger vers la page "add.js"
                // par exemple : router.push('/add');
                router.push(
                  `/ac/detailsReclamations/${row.original.id_reclamation}`
                );
              }}
            >
              Détails
            </button>
          );
        },
      },
    ]);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tableInstence = useTable(
    { columns, data: distData },
    useGlobalFilter,
    tableHooks
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstence;

  useEffect(() => {
    console.log("hiiiiiiiiiiii");
    fetchReclamations();
    console.log("********************************");
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [value, setValue] = useState(state.globalFilter);

  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col items-center pt-4 overflow-x-hidden text-center gap-11">
      <Head>
        <title>Réclamations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title title="Réclamations" />
      <div className="flex w-[1000px] items-center justify-evenly">
        <SearchTableBar
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <button className="w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center">
          <Image src="/icons/search.png" width={30} height={30}></Image>
        </button>
      </div>
      <div className="flex w-[1000px] items-center justify-evenly">
        <button
          className={`w-[180px] h-[60px] rounded border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-evenly ${
            selectedButton === "" ? "bg-[#343A49] text-white" : "bg-white"
          }`}
          onClick={() => handleButtonClick("")}
        >
          Tous
        </button>

        <button
          className={`w-[180px] h-[60px] rounded border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-evenly ${
            selectedButton === "Quality"
              ? "bg-[#343A49] text-white"
              : "bg-white"
          }`}
          onClick={() => handleButtonClick("Quality")}
        >
          Quality
        </button>

        <button
          className={`w-[180px] h-[60px] rounded border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-evenly ${
            selectedButton === "Delivery"
              ? "bg-[#343A49] text-white"
              : "bg-white"
          }`}
          onClick={() => handleButtonClick("Delivery")}
        >
          Delivery
        </button>
        <button
          className={`w-[180px] h-[60px] rounded border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-evenly ${
            selectedButton === "Pending"
              ? "bg-[#343A49] text-white"
              : "bg-white"
          }`}
          onClick={() => handleButtonClick("Pending")}
        >
          Pending
        </button>
        <button
          className={`w-[180px] h-[60px] rounded border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-evenly ${
            selectedButton === "Not-Pending"
              ? "bg-[#343A49] text-white"
              : "bg-white"
          }`}
          onClick={() => handleButtonClick("Not-Pending")}
        >
          Not-Pending
        </button>
      </div>
      <DataTable
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      />
    </div>
  );
}
