import { useAsyncDebounce } from 'react-table';
import Head from 'next/head';
import Image from 'next/image';
import { DataTable } from '../../components/shared/tables/table';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useGlobalFilter, useTable } from 'react-table';
import AddAdvertiserModal from '../../components/AC/annonces/addAdvertiser';
import { API_URL } from '../../config/api';
import DeleteAdvertiserModal from '../../components/AC/annonces/deleteAdvertiserModal';
import ModifyAdvertiserModal from '../../components/AC/annonces/modifyAdvertiser';
import { SearchTableBar } from '../../components/shared/search/searchTableBar';
import Title from '../../components/shared/layout/title';
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
	const [selectedAdvertiserDelete, setSelectedAdvertiserDelete] =
		useState(null);
	const [selectedAdvertiserModify, setSelectedAdvertiserModify] =
		useState(null);
	const fetchAnnoceurs = async () => {
		const token = localStorage.getItem('token');

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
				Header: 'Avatar',
				accessor: 'path_annonceur',
			},
			{
				Header: 'Nom',
				accessor: 'nom_annonceur',
			},

			{
				Header: 'Type',
				accessor: 'type_annonceur',
			},
			{
				Header: 'id_annonceur',
				accessor: 'id_annonceur',
			},
			{
				Header: "Nombre d'annonces",
				accessor: 'numberOfAds',
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
				id: 'Edit',
				Header: 'Actions',
				Cell: ({ row }) => {
					return (
						<div className='flex justify-center'>
							<button
								className='self-end px-4 py-4 mr-12 text-white  rounded-xl'
								type='button'
								onClick={() =>
									setSelectedAdvertiserModify(
										row.original
									)
								}>
								<Image
									src='/icons/darkEditIcon.svg'
									width={28}
									height={28}
									alt='edit Icon'
								/>
							</button>
							<button
								className='self-center px-2 py-2 text-dark-grey '
								type='button'
								onClick={() =>
									setSelectedAdvertiserDelete(
										row.original
									)
								}>
								<Image
									className='text-dark-grey'
									src='/icons/darkDeleteIcon.svg'
									width={26}
									height={26}
								/>
							</button>
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
		fetchAnnoceurs();
	}, []);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////
	return (
		<div className='relative flex flex-col items-center pt-4 overflow-x-hidden  text-center gap-11'>
			<Head>
				<title>Gestion des Annonceurs</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Title title='Gestion des annonceurs' />
			<div className='flex w-[1000px] items-center justify-evenly'>
				<SearchTableBar
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					globalFilter={state.globalFilter}
				/>

				<button className='w-[50px] h-[50px] rounded-full bg-[#343A49] flex items-center justify-center'>
					<Image
						src='/icons/search.svg'
						width={30}
						height={30}></Image>
				</button>
				<ModifyAdvertiserModal
					Advertiser={selectedAdvertiserModify}
					setSelectedAdvertiser={setSelectedAdvertiserModify}
					fetchAdvertisers={fetchAnnoceurs}
				/>
				<DeleteAdvertiserModal
					Advertiser={selectedAdvertiserDelete}
					setSelectedAdvertiser={setSelectedAdvertiserDelete}
					fetchAdvertisers={fetchAnnoceurs}
				/>
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
