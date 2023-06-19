import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAsyncDebounce } from 'react-table'
import { DataTable } from '../../components/shared/tables/table'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useGlobalFilter, useTable } from 'react-table'
import { Search_bar } from '../../components/shared/search/search_bar'
import AddClientDistModal from '../../components/SadmModels/addClientDist'
import AddClientModal from '../../components/SadmModels/addClient'
import Title from '../../components/shared/layout/title'
import tw from 'twin.macro'
import { API_URL } from '../../config/api'
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
  const [selectedClient, setSelectedClient] = useState(null)

  const router = useRouter()

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const response = await axios
        .get(API_URL + '/api/account.management/getAllClients', config)
        .catch((e) => console.log(e))
      if (response) {
        const clients = response.data.data
        console.log(clients)
        setClients(clients)
        setDefaultData(clients)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const columns = useMemo(
    () => [
      {
        Header: '  Client',
        accessor: 'nom_client',
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
              {/*  <AddClientDistModal
                id_client={row.original.id_client}
                fetchClients={fetchClients}
              />*/}
              <button
                type="button"
                onClick={() => setSelectedClient(row.original)}
                className="rounded-[15px] bg-transparent flex items-center justify-evenly"
              >
                <Image src="/icons/mug.svg" width={35} height={35}></Image>
              </button>


			<Title title='Gestion des clients' />
			<div className='flex w-[1000px] items-center justify-evenly'>
				<Search_bar
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					globalFilter={state.globalFilter}
				/>
				<button className='w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center'>
					<Image
						alt='search'
						src='/icons/search.png'
						width={30}
						height={30}></Image>
				</button>
				<AddClientModal fetchClients={fetchClients} />
				{/*<button className="w-[150px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly">

          <Image src="/icons/plus.png" width={35} height={35}></Image>
          Client
        </button>*/}
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
