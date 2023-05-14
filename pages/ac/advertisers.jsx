import { useAsyncDebounce } from "react-table";
import Head from "next/head";
import Image from "next/image";
import { DataTable } from "../../components/shared/tables/table";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useGlobalFilter, useTable } from "react-table";
import SearchBar from "../../components/shared/search/searchBar";
import AddAdvertiserModal from "../../components/AC/addAdvertiser";
import { API_URL } from "../../config/api";
import DeleteAdvertiserModal from "../../components/AC/deleteAdvertiserModal";
import ModifyAdvertiserModal from "../../components/AC/modifyAdvertiser";
import { SearchTableBar } from "../../components/shared/search/searchTableBar";
/*
const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-white
  rounded-lg
  bg-[#343A49]
`;
*/

export default function Annonceurs() {
  ////////////---------------------- Dynamic table -----------------------------------///////////////////////////////////////////////////////////////////////////////////////////////
  const [Annoceurs, setAnnoceurs] = useState([]);
  const [defaultData, setDefaultData] = useState([]);

  const fetchAnnoceurs = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(`${API_URL}/api/ads/getAllAdvertisers/`, config)
      .catch((e) => console.log(e));
    if (response) {
      const advtisers = response.data;
      setAnnoceurs(advtisers);
      setDefaultData(advtisers);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/ads/deleteAdvertiser${id}`
      );
      fetchAnnoceurs();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/ads/updateAdvertiser${id}`
      );
      fetchAnnoceurs();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "path_annonceur",
      },
      {
        Header: "NOM",
        accessor: "nom_annonceur",
      },
      {
        Header: "Prenom",
        accessor: "prenom_annonceur",
      },

      {
        Header: "Type",
        accessor: "type_annonceur",
      },
      {
        Header: "id_annonceur",
        accessor: "id_annonceur",
      },
    ],
    []
  );
  //////////////////--------------API EXAMPLE----------------------//////////////////////////////////////////////////////////////////////////
  const distData = useMemo(() => [...Annoceurs], [Annoceurs]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "actions",
        Cell: ({ row }) => {
          return (
            <div className="flex justify-center">
              <ModifyAdvertiserModal
                Advertiser={row.original}
                fetchAdvertisers={fetchAnnoceurs}
              />

              <DeleteAdvertiserModal
                AdvertiserId={row.original.id_annonceur}
                fetchAdvertisers={fetchAnnoceurs}
                name={row.original.nom_annonceur}
              />

              {/*<Button onClick={() => alert('details ')}>details</Button>*/}
            </div>
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
    fetchAnnoceurs();
    console.log("********************************");
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [value, setValue] = useState(state.globalFilter);
  /*  const filterBtn = useAsyncDebounce((value) => {
          console.log(value);
          setGlobalFilter(value || undefined);
     }, 300);
*/

  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col items-center pt-4 overflow-x-hidden overflow-y-scroll text-center gap-11">
      <Head>
        <title>Gestion des Annonceurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="border border-solid	border-[#222326] rounded-xl bg-header-bg w-fit px-4 py-2 shadow-md">
        <h1 className="text-4xl font-semibold text-[#222326]">
          Gestion des Annonceurs
        </h1>
      </div>
      <div className="flex w-[1000px] items-center justify-evenly">
        <SearchTableBar
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <button className="w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center">
          <Image src="/icons/search.svg" width={30} height={30}></Image>
        </button>

        <AddAdvertiserModal fetchAdvertisers={fetchAnnoceurs} />
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
/*
        <button
          onClick={addBtnClick}
          className="w-[180px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly"
        >
          <Image src="/icons/plus.png" width={35} height={35}></Image>
          distributeur
        </button>
*/