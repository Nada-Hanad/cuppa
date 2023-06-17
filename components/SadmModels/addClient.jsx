import axios from 'axios';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { async } from 'regenerator-runtime';
import { API_URL } from '../../config/api';

export default function AddClientModal({ fetchClients }) {
	const [showModal, setShowModal] = React.useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (event.target.classList.contains('modal')) {
				setShowModal(false);
			}
		}

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const [nom_client, set_nom_client] = React.useState('');
	const [prenom_client, set_prenom_client] = React.useState('');
	const [type_client, set_type_client] = React.useState('');
	const insertNewClient = async (nom_client, prenom_client, type_client) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			const response = await axios.post(
				API_URL + '/api/account.management/createClientAccount/',
				{
					nom_client: nom_client,
					prenom_client: prenom_client,
					type_client: type_client,
				},
				config
			);
			console.log(token);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSave = async () => {
		await insertNewClient(nom_client, prenom_client, type_client);
		// Reset the form
		set_nom_client('');
		set_prenom_client('');
		set_type_client('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nom_client) {
			toast.error('Veuillez ajouter le nom de client');
			return;
		} else if (!type_client) {
			toast.error('Veuillez ajouter le type de client');
			return;
		}
		// If all validations pass, save the beverage
		await handleSave();
		await fetchClients();
		toast.success('Ajouté avec success');
		setShowModal(false);
	};

	return (
		<>
			<button
				type='button'
				onClick={() => setShowModal(true)}
				className='w-[160px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly'>
				{/*
    <Image src="/icons/plus.png" width={35} height={35}></Image>
        */}
				Ajouter client
			</button>

			{showModal ? (
				<>
					<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal'>
						<div className='relative w-auto max-w-3xl mx-auto my-6'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none  h-[450px] w-[400px] overflow-hidden'>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200'>
									<h3 className='text-3xl font-semibold'>
										Ajouter un client
									</h3>
									<button
										className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none'
										onClick={() =>
											setShowModal(false)
										}>
										<span className='block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='relative flex-auto p-6'>
									<form>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='name'>
												nom de client :
											</label>
											<input
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='nom_client'
												type='text'
												placeholder='Entrez le nom de client'
												onChange={(e) =>
													set_nom_client(
														e.target
															.value
													)
												}
											/>
											{/*
                    <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="name"
                      >
                        prenom de client : 
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="prenom_client"
                        type="text"
                        placeholder="Entrez le prenom de client"
                        onChange={(e) => set_prenom_client(e.target.value)}
                      />*/}
											<label
												className='block mt-8 mb-2 font-bold text-gray-700'
												htmlFor='name'>
												type de client :
											</label>
											<label className='inline-flex items-center'>
												<input
													type='radio'
													className='form-radio'
													name='type_client'
													value='individual'
													onChange={(
														e
													) =>
														set_type_client(
															e
																.target
																.value
														)
													}
													checked={
														type_client ===
														'individual'
													}
												/>
												<span className='ml-2'>
													Individuel
												</span>
											</label>
											<label className='inline-flex items-center ml-6'>
												<input
													type='radio'
													className='form-radio'
													name='type_client'
													value='enterprise'
													onChange={(
														e
													) =>
														set_type_client(
															e
																.target
																.value
														)
													}
													checked={
														type_client ===
														'enterprise'
													}
												/>
												<span className='ml-2'>
													Entreprise
												</span>
											</label>
										</div>
									</form>
								</div>

								<div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200'>
									<button
										className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={handleSubmit}>
										Ajouter
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='fixed inset-0 z-40 bg-black opacity-25'></div>
				</>
			) : null}
		</>
	);
}
