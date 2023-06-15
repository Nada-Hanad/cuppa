import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import tw from 'twin.macro';
import Image from 'next/image';
const Table = tw.table`
w-[1300px]
//table-fixed
  text-base
  rounded-[20px]
drop-shadow-xl
overflow-hidden
  `;

const TableHead = tw.thead`
h-[60px]
text-white
bg-[#343A49]  
p-2
`;

const TableRow = tw.tr`
border-b-2
border-orange-400
`;

const TableHeader = tw.th`
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
bg-white
text-[#343A49]
font-bold
border-b-2
border-[#D27842]
p-5
`;

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
`;

export function Clients(props) {
	const [distributeurs, setDistributeurs] = useState([]);

	const fetchDistributeurs = async () => {
		const response = await axios
			.get('https://fakestoreapi.com/products')
			.catch((e) => console.log(e));
		if (response) {
			const dists = response.data;
			setDistributeurs[dists];
		}
	};
	/////////////////////////---------EXAMPLE--------------------/////////////////////////////////////////////////////////////////////////////
	const data = useMemo(
		() => [
			{
				client: 'Bouchra.co',
				client_type: 'enterprise',
				nb_distributeurs: '1',
			},
			{
				client: 'Safa Zakaria ',
				client_type: 'person',
				nb_distributeurs: '10',
			},
			{
				client: 'Rouibi Selsabil',
				client_type: 'person',
				nb_distributeurs: '4',
			},
			{
				client: 'Gouasmia Malak',
				client_type: 'person',
				nb_distributeurs: '3',
			},
			{
				client: 'Hanad Nada',
				client_type: 'person',
				nb_distributeurs: '12',
			},
			{
				client: 'Asma.co',
				client_type: 'enterprise',
				nb_distributeurs: '5',
			},
			{
				client: 'Maissa.co',
				client_type: 'enterprise',
				nb_distributeurs: '9',
			},
		],
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: '  Client',
				accessor: 'client',
			},
			{
				Header: 'Client type',
				accessor: 'client_type',
			},
			{
				Header: 'Nombre des distributeurs',
				accessor: 'nb_distributeurs',
			},
		],
		[]
	);
	//////////////////--------------API EXAMPLE----------------------//////////////////////////////////////////////////////////////////////////
	console.log(distributeurs);

	const distData = useMemo(() => [...distributeurs], [distributeurs]);
	const distColumns = useMemo(
		() =>
			distributeurs[0]
				? Object.keys(distributeurs[0])
						.filter((key) => key !== 'rating')
						.map((key) => {
							return { Header: key, accessor: key };
						})
				: [],
		[distributeurs]
	);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: 'Edit',
				Header: '',
				Cell: ({ row }) => {
					return (
						<div className='flex justify-evenly'>
							<button onClick={() => alert('add dist ')}>
								<Image
									alt='mug'
									src='/icons/mug.svg'
									width={40}
									height={40}></Image>
							</button>
							<Button onClick={() => alert('details ')}>
								details
							</Button>
						</div>
					);
				},
			},
		]);
	};
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const tableInstence = useTable({ columns, data }, tableHooks);
	//const tableInstence = useTable({columns : distColumns ,data : distData ,})

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstence;

	useEffect(() => {
		fetchDistributeurs();
	}, []);

	return (
		<div className=''>
			<Table {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<TableHeader
									{...column.getHeaderProps()}>
									{column.render('Header')}
								</TableHeader>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);

						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map((cell, idx) => {
									if (
										cell.column.id ===
											'client_type' &&
										cell.value === 'person'
									) {
										return (
											<TableData
												{...cell.getCellProps()}>
												<div className='flex justify-center'>
													<Image
														src='/icons/user.svg'
														width={40}
														height={
															40
														}
														alt='user'
													/>
												</div>
											</TableData>
										);
									} else if (
										cell.column.id ===
											'client_type' &&
										cell.value === 'enterprise'
									) {
										return (
											<TableData
												{...cell.getCellProps()}>
												<div className='flex justify-center'>
													<Image
														src='/icons/company.png'
														width={40}
														height={
															40
														}
														alt='company'
													/>
												</div>
											</TableData>
										);
									} else {
										return (
											<TableData
												{...cell.getCellProps()}>
												{cell.render(
													'Cell'
												)}
											</TableData>
										);
									}
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
