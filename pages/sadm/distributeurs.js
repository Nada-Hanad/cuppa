import { useAsyncDebounce } from 'react-table'
import Head from 'next/head'
import Image from 'next/image'
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
`

export default function SADM_distributeurs() {
  ////////////---------------------- Dynamic table -----------------------------------///////////////////////////////////////////////////////////////////////////////////////////////
  const [distributeurs, setDistributeurs] = useState([])
  const [defaultData, setDefaultData] = useState([])

  const fetchDistributeurs = async () => {
    const response = await axios
      .get('http://localhost:8000/distributeurs')
      .catch((e) => console.log(e))
    if (response) {
      const dists = response.data
      setDistributeurs(dists)
      setDefaultData(dists)
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/distributeurs/${id}`
      )
      fetchDistributeurs()
    } catch (error) {
      console.error(error)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Numéro de séries',
        accessor: 'numero_serie_distributeur',
      },
      {
        Header: 'Propriétaire',
        accessor: 'id_client',
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
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'actions',
        Cell: ({ row }) => {
          if (row.original.etat_distributeur === 'Desactivé') {
            return (
              <div className="flex justify-evenly">
                {/*
                  <button onClick={() => alert('edit ')}>
                    <Image src="/icons/edit.png" width={40} height={40}></Image>
                  </button>*/}
                <button
                  onClick={() =>
                    handleDelete(row.original.numero_serie_distributeur)
                  }
                >
                  <Image src="/icons/delete.svg" width={40} height={40}></Image>
                </button>
                {/*<Button onClick={() => alert('details ')}>details</Button>*/}
              </div>
            )
          } else {
            return (
              <div className="flex justify-end">
                {/*<Button onClick={() => alert('details ')} className="mr-16">
                  details
                </Button>*/}
              </div>
            )
          }
        },
      },
    ])
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tableInstence = useTable(
    { columns, data: distData },
    useGlobalFilter,
    tableHooks
  )

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
    <div className="text-center pt-4 flex flex-col items-center gap-11 overflow-y-scroll overflow-x-hidden">
      <Head>
        <title>Gestion des distributeurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="border border-solid	border-[#222326] rounded-xl bg-header-bg w-fit px-4 py-2 shadow-md">
        <h1 className="text-4xl font-semibold text-[#222326]">
          Gestion des distributeurs
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
        <AddDistModal fetchDistributeurs={fetchDistributeurs} />
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
            setDistributeurs(defaultData.filter((d) => d.id_client != null))
          }}
        >
          Affectés
        </button>
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            setDistributeurs(defaultData.filter((d) => d.id_client === null))
          }}
        >
          Non affectés
        </button>
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            setDistributeurs(
              defaultData.filter((d) => d.etat_distributeur === 'Activé')
            )
          }}
        >
          Activés
        </button>
        <button
          className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly"
          onClick={() => {
            setDistributeurs(
              defaultData.filter((d) => d.etat_distributeur === 'Desactivé')
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
/*
        <button
          onClick={addBtnClick}
          className="w-[180px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly"
        >
          <Image src="/icons/plus.png" width={35} height={35}></Image>
          distributeur
        </button>
*/