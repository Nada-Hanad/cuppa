import { useAsyncDebounce } from 'react-table';
import Head from 'next/head';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { DataTable } from '../../components/shared/tables/table';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useGlobalFilter, useTable } from 'react-table';
import { Search_bar } from '../../components/shared/search/search_bar';
import AddDistModal from '../../components/SadmModels/addDist';
import tw from 'twin.macro';
import { API_URL } from '../../config/api';
import Title from '../../components/shared/layout/title';

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-white
  rounded-lg
  bg-[#343A49]
`;

export default function SADM_distributeurs() {
	////////////---------------------- Dynamic table -----------------------------------///////////////////////////////////////////////////////////////////////////////////////////////
	const [distributeurs, setDistributeurs] = useState([]);
	const [defaultData, setDefaultData] = useState([]);

	const fetchDistributeurs = async () => {
		const response = await axios
			.get(API_URL + '/distributeurs')
			.catch((e) => console.log(e));
		if (response) {
			const dists = response.data;
			setDistributeurs(dists);
			setDefaultData(dists);
		}
	};
	const handleDelete = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			const response = await axios.post(
				API_URL + `/distributeurs/delete/${id}`,
				{},
				config
			);
			fetchDistributeurs();
			toast.success('supprimer avec success');
		} catch (error) {
			console.error(error);
		}
	};

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
	);
	//////////////////--------------API EXAMPLE----------------------//////////////////////////////////////////////////////////////////////////
	const distData = useMemo(() => [...distributeurs], [distributeurs]);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: 'Edit',
				Header: 'Actions',
				Cell: ({ row }) => {
					if (
						row.original.etat_distributeur === 'Inactive' &&
						row.original.id_client === null
					) {
						return (
							<div className='flex justify-evenly'>
								<button
									onClick={() =>
										handleDelete(
											row.original
												.numero_serie_distributeur
										)
									}>
									<Image
										src='/icons/delete.svg'
										width={40}
										height={40}></Image>
								</button>
							</div>
						);
					} else {
						return (
							<div className='flex justify-end'>
								{/*<Button onClick={() => alert('details ')} className="mr-16">
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> fcbd69d635fc28cbfca0c32c74560e6bda911cac
=======

>>>>>>> origin
                  details
                </Button>*/}
							</div>
						);
					}
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
		fetchDistributeurs();
	}, []);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [value, setValue] = useState(state.globalFilter);
	const filterBtn = useAsyncDebounce((value) => {
		console.log(value);
		setGlobalFilter(value || undefined);
	}, 300);

	const [filter, setFilter] = useState('all');
	const filteredData = distributeurs
		? distributeurs.filter((item) => {
				if (filter === 'all') {
					return true;
				} else {
					return item.etat_distributeur === filter;
				}
		  })
		: [];
	////////////////////////////////////////////////////////////////////////////////////
	return (
		<div className='flex flex-col items-center pt-4 overflow-x-hidden text-center gap-11'>
			<Head>
				<title>Gestion des distributeurs</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Title title='Gestion des distributeurs' />
			<div className='flex w-[1000px] items-center justify-evenly'>
				<Search_bar
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					globalFilter={state.globalFilter}
				/>
				<button className='w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center'>
					<Image
						src='/icons/search.png'
						width={30}
						height={30}></Image>
				</button>
				<AddDistModal fetchDistributeurs={fetchDistributeurs} />
			</div>
			<div className='flex w-[1000px] items-center justify-evenly'>
				<button
					className='w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly'
					onClick={() => {
						setDistributeurs(defaultData);
					}}>
					Tous
				</button>
				<button
					className='w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly'
					onClick={() => {
						setDistributeurs(
							defaultData.filter(
								(d) => d.id_client != null
							)
						);
					}}>
					Affectés
				</button>
				<button
					className='w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly'
					onClick={() => {
						setDistributeurs(
							defaultData.filter(
								(d) => d.id_client === null
							)
						);
					}}>
					Non affectés
				</button>
				<button
					className='w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly'
					onClick={() => {
						setDistributeurs(
							defaultData.filter(
								(d) => d.etat_distributeur === 'Active'
							)
						);
					}}>
					Activés
				</button>
				<button
					className='w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] bg-white font-semibold text-[20px] flex items-center justify-evenly'
					onClick={() => {
						setDistributeurs(
							defaultData.filter(
								(d) =>
									d.etat_distributeur === 'Inactive'
							)
						);
					}}>
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
	);
}
/*

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
*/
