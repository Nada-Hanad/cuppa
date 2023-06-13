import { useAsyncDebounce } from 'react-table'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { DataTable } from '../../../components/shared/tables/table'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useGlobalFilter, useTable } from 'react-table'
import { Search_bar } from '../../../components/shared/search/search_bar'
import AddDistModal from '../../../components/SadmModels/addDist'
import tw from 'twin.macro'
import { API_URL } from '../../../config/api'
import Title from '../../../components/shared/layout/title'
import ClientIDCard from '../../../components/SadmModels/clientCard'

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-white
  rounded-lg
  bg-[#343A49]
`

export default function SADM_clientDetails() {
  ////////////---------------------- Dynamic table -----------------------------------///////////////////////////////////////////////////////////////////////////////////////////////
  const [distributeurs, setDistributeurs] = useState([])
  const [defaultData, setDefaultData] = useState([])
  const [client, setClient] = useState([])
  const router = useRouter()
  const id_client = router.query

  const fetchClient = async () => {
    const response = await axios
      .get(`${API_URL}/client/${id_client}`)
      .catch((e) => console.log(e))
    if (response) {
      const client = response.data
      setClient(client)
    }
  }

  const fetchDistributeurs = async () => {
    const response = await axios
      .get(API_URL + '/distributeurs')
      .catch((e) => console.log(e))
    if (response) {
      const dists = response.data
      setDistributeurs(dists)
      setDefaultData(dists)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Numéro de séries',
        accessor: 'numero_serie_distributeur',
      },
      {
        Header: 'Etat',
        accessor: 'etat_distributeur',
      },
    ],
    []
  )
  //////////////////--------------API EXAMPLE----------------------//////////////////////////////////////////////////////////////////////////
  const distData = useMemo(() => [...distributeurs], [distributeurs])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tableInstence = useTable({ columns, data: distData }, useGlobalFilter)

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
    fetchDistributeurs()
    //fetchClient()
    setClient({
      id_client: 1,
      client: 'Bouchra.co',
      type_client: 'enterprise',
      nb_distributeurs: '1',
    })
  }, [])

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [value, setValue] = useState(state.globalFilter)
  const filterBtn = useAsyncDebounce((value) => {
    console.log(value)
    setGlobalFilter(value || undefined)
  }, 300)

  const [filter, setFilter] = useState('all')
  const filteredData = distributeurs
    ? distributeurs.filter((item) => {
        if (filter === 'all') {
          return true
        } else {
          return item.etat_distributeur === filter
        }
      })
    : []
  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col items-center pt-4 overflow-x-hidden text-center gap-11">
      <Head>
        <title>les distrbuteur de client </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title title="les distrbuteur de client" />
      <div className="flex w-[1000px] items-center justify-evenly">
        <ClientIDCard client={client} />
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
        {/*<AddDistModal fetchDistributeurs={fetchDistributeurs} /> */}
      </div>
      <div className="flex w-[1000px] items-center justify-evenly">
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            setDistributeurs(defaultData)
          }}
        >
          Tous
        </button>
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            setDistributeurs(
              defaultData.filter((d) => d.etat_distributeur === 'Active')
            )
          }}
        >
          Activés
        </button>
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            setDistributeurs(
              defaultData.filter((d) => d.etat_distributeur === 'Inactive')
            )
          }}
        >
          Désactivés
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
  )
}
