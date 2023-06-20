import Image from 'next/image';
import { PUBLIC_URL } from '../../../config/api';
import { useState } from 'react';
export function DataTable({
	getTableProps,
	getTableBodyProps,
	headerGroups,
	rows,
	prepareRow,
}) {
	return (
		<div className=''>
			<table
				{...getTableProps()}
				className='w-[1300px]
  text-base
  rounded-[20px]
drop-shadow-xl
overflow-hidden'>
				<thead
					className='h-[70px]
text-white
bg-[#343A49]  
p-2'>
					{headerGroups.map((headerGroup, index) => (
						<tr
							className='border-b-2 border-orange-400'
							key={index}
							{...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(
								(column) =>
									column.id != 'id_annonceur' && (
										<th
											className='p-2'
											key={column.render(
												'Header'
											)}
											{...column.getHeaderProps()}>
											{column.render('Header')}
										</th>
									)
							)}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, index) => {
						prepareRow(row);

						return (
							<tr
								{...row.getRowProps()}
								key={index}
								clas
								className='h-[80px] bg-white  border-b-2   
                                                  
												  border-[#D27842]'>
								{row.cells.map((cell, idx) =>
									cell.column.id ===
									'path_annonceur' ? (
										<td
											key={idx}
											className='relative flex justify-center h-full p-3 font-bold bg-white'>
											<div class='w-14 h-14 rounded-full overflow-hidden'>
												<img
													src={`${PUBLIC_URL}${cell.value}`}
													alt='Avatar'
													class='w-full h-full object-center object-cover'
												/>
											</div>
										</td>
									) : cell.column.id ===
											'type_annonceur' &&
									  cell.value === 'Personne' ? (
										<td
											key={idx}
											className='flex justify-center p-2 font-bold bg-white'>
											<Image
												src='/icons/man 2.svg'
												width={40}
												height={40}
												alt='men'
											/>
										</td>
									) : cell.column.id ===
											'type_annonceur' &&
									  cell.value === 'Enterprise' ? (
										<td
											key={idx}
											className='flex justify-center p-2 font-bold bg-white'>
											<Image
												src='/icons/office 2.svg'
												width={40}
												height={40}
												alt='office'
											/>
										</td>
									) : cell.column.id ===
											'id_client' &&
									  !cell.value ? (
										<td
											key={idx}
											className=' p-2  font-bold text-[#343A49]  

                                                                                 '>
											Pas de propriétaire
										</td>
									) : cell.column.id ===
									  'distributeurs' ? (
										<td
											key={idx}
											className=' p-2  font-bold text-[#343A49]  

                                                                                 '>
											{cell.value[0]
												? cell.value[0]
														.distributor_count
												: 0}
										</td>
									) : cell.column.id ===
											'type_client' &&
									  cell.value === 'individual' ? (
										<td>
											<div className='flex justify-center'>
												<Image
													src='/icons/user.svg'
													width={40}
													height={40}
												/>
											</div>
										</td>
									) : cell.column.id ===
											'type_client' &&
									  cell.value === 'enterprise' ? (
										<td>
											<div className='flex justify-center'>
												<Image
													src='/icons/company.png'
													width={40}
													height={40}
												/>
											</div>
										</td>
									) : (
										cell.column.id !=
											'id_annonceur' && (
											<td
												className='bg-white
                                                                                text-[#343A49]
                                                                                font-bold
                                                                           
                                                                                p-2'
												key={idx}
												{...cell.getCellProps()}>
												{cell.render(
													'Cell'
												)}
											</td>
										)
									)
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
