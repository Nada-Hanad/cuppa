import Head from 'next/head'
import Image from 'next/image'
import { useAsyncDebounce } from 'react-table'
import { DataTable } from '../../components/shared/table'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useGlobalFilter, useTable } from 'react-table'
import { Search_bar } from '../../components/shared/search_bar'
import AddDistModal from '../../components/SadmModels/addDist'
import tw from 'twin.macro'
const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-white
  rounded-lg
  bg-[#343A49]
 // hover:bg-green-200
  //transition-colors
`

export default function SADM_clients() {
  const [clients, setClients] = useState([])
  const [defaultData, setDefaultData] = useState([])

  const fetchClients = async () => {
    const response = await axios
      .get('http://localhost:8000/distributeurs')
      .catch((e) => console.log(e))
    if (response) {
      const clients = response.data
      setClients(clients)
      setDefaultData(clients)
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/distributeurs/${id}`
      )
      fetchClients()
    } catch (error) {
      console.error(error)
    }
  }
  const columns = useMemo(
    () => [
      {
        Header: '  Client',
        accessor: 'client',
      },
      {
        Header: 'Client type',
        accessor: 'type_client',
      },
      {
        Header: 'Nombre des distributeurs',
        accessor: 'nb_distributeurs',
      },
    ],
    []
  )
  const data = useMemo(
    () => [
      {
        client: 'Bouchra.co',
        type_client: 'enterprise',
        nb_distributeurs: '1',
      },
      {
        client: 'Safa Zakaria ',
        type_client: 'person',
        nb_distributeurs: '10',
      },
      {
        client: 'Rouibi Selsabil',
        type_client: 'person',
        nb_distributeurs: '4',
      },
      {
        client: 'Gouasmia Malak',
        type_client: 'person',
        nb_distributeurs: '3',
      },
      {
        client: 'Hanad Nada',
        type_client: 'person',
        nb_distributeurs: '12',
      },
      {
        client: 'Asma.co',
        type_client: 'enterprise',
        nb_distributeurs: '5',
      },
      {
        client: 'Maissa.co',
        type_client: 'enterprise',
        nb_distributeurs: '9',
      },
    ],
    []
  )
  const clientData = useMemo(() => [...clients], [clients])
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: '',
        Cell: ({ row }) => {
          return (
            <div className="flex justify-evenly">
              <button onClick={() => alert('add dist ')}>
                <Image src="/icons/mug.svg" width={40} height={40}></Image>
              </button>
              <Button onClick={() => alert('details ')}>details</Button>
            </div>
          )
        },
      },
    ])
  }
  const tableInstence = useTable({ columns, data }, useGlobalFilter, tableHooks)
  /*
const tableInstence = useTable(
  { columns, data: clientData },
  useGlobalFilter,
  tableHooks
)
*/
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstence

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="text-center pt-4 flex flex-col items-center gap-11 overflow-y-scroll overflow-x-hidden">
      <Head>
        <title>Gestion des clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="border border-solid	border-[#222326] rounded-xl bg-header-bg w-fit px-4 py-2 shadow-md">
        <h1 className="text-4xl font-semibold text-[#222326]">
          Gestion des clients
        </h1>
      </div>
      <div className="flex w-[1000px] items-center justify-evenly">
        <Search_bar
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <button className="w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center">
          <Image src="/icons/search.png" width={30} height={30}></Image>
        </button>
        {/*<AddClientModal fetchClients={fetchClients} /> */}
        <button className="w-[150px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly">
          <Image src="/icons/plus.png" width={35} height={35}></Image>
          Client
        </button>
      </div>
      <DataTable
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      />
      {/* <Clients />*/}
    </div>
  )
}
