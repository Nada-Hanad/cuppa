import React, { useEffect } from 'react';
import AddIngredients from './addIngredients';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_URL } from '../../config/api';
export default function AddAdvertiserModal({ drinks, fetchAdvertisers }) {
	const [showModal, setShowModal] = React.useState(false);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};

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
	const [firstName, setFirstName] = React.useState('');
	const [familyName, setFamilyName] = React.useState('');
	const [type, setType] = React.useState('');
	const [image, setImage] = React.useState('');

	const handleTypeChange = (e) => {
		e.preventDefault();
		setType(e.target.value);
	};

	const handleSave = async () => {
		const formData = new FormData();
		formData.append('nom_annonceur', firstName);
		formData.append('type_annonceur', type);
		formData.append('prenom_annonceur', familyName);
		formData.append('image', ImgaeFile);
		try {
			const res = await axios.post(
				`${API_URL}/api/ads/createAdvertiser/`,
				formData
			);
			console.log(res.data);
		} catch (err) {
			console.error(err);
		}

		// Reset the form
		setFirstName('');
		setFamilyName('');
		setType('');
		setImage('');
		setShowModal(false);
		fetchAdvertisers();
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!familyName) {
			toast.error('Veuillez entrer le nom de la Annonceur');
			return;
		}
		if (!type) {
			toast.error('Veuillez entrer le type de la Annonceur');
			return;
		}
		if (!image) {
			toast.error('Veuillez entrer une image de la Annonceur');
			return;
		}
		if (!familyName) {
			toast.error('Veuillez entrer le nom de la Annonceur');
			return;
		}

		// If all validations pass, save the beverage
		handleSave();
		toast.success('Ajouté avec success');
	};

	// image handling
	const [ImgaeFile, setImgaeFile] = React.useState(null);
	const handleFileInputChange = (event) => {
		setImgaeFile(event.target.files[0]);
		setSelectedFile(file);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const input = e.target.value;
		setImgaeFile(file);

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				setImage(reader.result);
			};
			setSelectedFile(true);
		} else if (input) {
			setImage(input);
		}
	};

	return (
		<>
			<button
				className='self-end px-4 py-4 mr-12 text-white bg-dark-grey rounded-xl'
				type='button'
				onClick={() => setShowModal(true)}>
				Ajouter
			</button>
			{showModal ? (
				<>
					<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal'>
						<div className='relative w-auto max-w-3xl mx-auto my-6'>
							{/*content*/}
							<div
								className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none over overflow-y-scroll 
                                        scrollbar  scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack
                                        h-[600px] w-[600px] '>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200'>
									<h3 className='text-3xl font-semibold'>
										Ajouter un Annonceur
									</h3>
									<button
										className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none'
										onClick={() =>
											setShowModal(false)
										}>
										<span className='z-10 block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none'>
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
												htmlFor='familyName'>
												Nom de l&apos;
												Annonceur
											</label>
											<input
												name='familyName'
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='name'
												type='text'
												placeholder='Entrez le nom de la Annonceur'
												value={familyName}
												onChange={(e) =>
													setFamilyName(
														e.target
															.value
													)
												}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='firstName'>
												prénom de l&apos;
												Annonceur
											</label>
											<input
												name='firstName'
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='name'
												type='text'
												placeholder='Entrez le nom de la Annonceur'
												value={firstName}
												onChange={(e) =>
													setFirstName(
														e.target
															.value
													)
												}
											/>
										</div>

										<div className='mb-4'>
											<label
												className='block font-bold text-gray-700 '
												htmlFor='name'>
												Le Type
											</label>

											<div className='flex items-center justify-center'>
												<div className='flex items-center ml-2 '>
													<div className='mr-2'>
														<input
															type='radio'
															name='type'
															id='Personne'
															value='Personne'
															className='mr-1 appearance-none'
															onClick={
																handleTypeChange
															}
														/>
														<label
															htmlFor='Personne'
															className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
																type ===
																'Personne'
																	? ' bg-slate-800 text-slate-50'
																	: ''
															}`}>
															Personne
														</label>
													</div>
													<div className='mr-2'>
														<input
															type='radio'
															name='type'
															id='Enterprise'
															value='Enterprise'
															onClick={
																handleTypeChange
															}
															className='mr-1 appearance-none'
														/>
														<label
															htmlFor='Enterprise'
															className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
																type ===
																'Enterprise'
																	? ' bg-slate-800 text-slate-50'
																	: ''
															}`}>
															Enterprise
														</label>
													</div>
												</div>
											</div>
										</div>
										{/*
                                                  <div className='mb-4'>
                                                       <label
                                                            className='block mb-2 font-bold text-gray-700'
                                                            htmlFor='price'>
                                                            Prix
                                                       </label>
                                                       <input
                                                            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                                                            id='price'
                                                            type='number'
                                                            placeholder='Entrez le prix de la Annonce'
                                                            value={price}
                                                            onChange={(e) =>
                                                                 setPrice(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       />
                                                  </div>
               */}
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='picture'>
												Image
											</label>

											<div className='relative flex items-center justify-between gap-8 '>
												{image ? (
													<Image
														src={
															image
														}
														alt='Boisson'
														className='object-cover w-full h-48 rounded'
														height={
															300
														}
														width={
															300
														}
													/>
												) : (
													<div className='w-48 h-48 bg-gray-200 rounded' />
												)}
												<input
													id='image'
													type='file'
													className='absolute inset-0 opacity-0 cursor-pointer'
													accept='.jpg, .jpeg, .png'
													onChange={
														handleImageChange
													}
												/>
												<button
													className={`px-4 py-2 text-dark-gray ${
														selectedFile
															? 'bg-scrollbarThumb text-white'
															: 'bg-gray-200'
													}  rounded hover:bg-blue-600 focus:outline-none`}>
													Select File
												</button>
											</div>
										</div>
									</form>
								</div>

								<div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200'>
									<button
										className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={handleSubmit}>
										Sauvegarder
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
