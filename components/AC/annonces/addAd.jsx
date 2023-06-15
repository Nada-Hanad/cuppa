import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Range } from 'react-range';
import axios from 'axios';
import { API_URL, PUBLIC_URL } from '../../../config/api';
import Autocomplete from 'react-autocomplete';

export default function AddAdModal({ fetchAdvertisements, advertisers }) {
	const [selectedOption, setSelectedOption] = React.useState('');

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
	const [name, setName] = React.useState('');
	const [showTime, setShowTime] = React.useState(0);
	const [showTimeUnite, setShowTimeUnite] = React.useState('jours');
	const [sexe, setSexe] = React.useState('M');
	const [price, setPrice] = React.useState(0);
	const [type, setType] = React.useState('forfait');
	const [startDate, setStartDate] = React.useState(new Date());
	const [minMaxAge, setMinMaxAge] = React.useState([20, 40]);
	const [videoFile, setVideoFile] = React.useState(null);
	const [videoPath, setVideoPath] = React.useState('');
	const [selectedAdvertiser, setSelectedAdvertiser] = React.useState(null);
	const [value, setValue] = React.useState('');

	const handleMinMaxAgeChange = (newValue) => {
		setMinMaxAge(newValue);
	};

	const handleshowTimeUnitChange = (e) => {
		e.preventDefault();
		setShowTimeUnite(e.target.value);
	};
	const handleTypeChange = (e) => {
		e.preventDefault();
		setType(e.target.value);
	};
	const handleSexeChange = (e) => {
		e.preventDefault();
		setSexe(e.target.value);
	};

	const handleSelect = (val) => {
		const selected = advertisers.find(
			(advertiser) => advertiser?.nom_annonceur === val
		);
		setSelectedAdvertiser(selected);
		setValue(val);
	};
	const filteredAdvertisers = advertisers
		?.filter((advertiser) =>
			advertiser.nom_annonceur
				?.toLowerCase()
				?.includes(value.toLowerCase())
		)
		.slice(0, 3); // Limit the number of items to 3
	const handleSave = async () => {
		try {
			const duree_affichage =
				showTimeUnite == 'jours'
					? showTime
					: showTimeUnite == 'semaines'
					? showTime * 7
					: showTime * 30;
			const formData = new FormData();
			formData.append('nom_annonce', name);
			formData.append('id_annonceur', selectedAdvertiser.id_annonceur);
			formData.append('duree_affichage', duree_affichage);
			formData.append('type_forfait', type);
			formData.append('ageMax', minMaxAge[1]);
			formData.append('ageMin', minMaxAge[0]);
			formData.append('sexe_cible', sexe);
			formData.append('tarif_annonce', price);
			formData.append('videoFile', videoFile);

			const response = await axios.post(
				`${API_URL}/api/ads/createAdvertisement/`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			response.data;
		} catch (error) {
			console.error(error);
		}
		// Reset the form
		setName('');
		setPrice('');
		setSexe('');
		setShowTime(0);
		setShowTimeUnite('jours');
		setType('forfait');
		setVideoPath('');
		setMinMaxAge([10, 20]);
		console.log(fetchAdvertisements);
		await fetchAdvertisements();
		setShowModal(false);
		console.log(showModal);
	};

	const handleFileInputChange = async (event) => {
		const file = event.target.files[0];
		setVideoFile(file);
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			console.log('start reading the video');

			reader.onload = () => {
				console.log('done reading the video');
				setVideoPath(reader.result);
			};
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!price) {
			toast.error('Veuillez entrer le prix de la Annonce');
			return;
		}
		if (price < 0) {
			toast.error('Veuillez entrer un prix positif');
			return;
		}

		if (price < 0) {
			toast.error('Veuillez entrer un prix positif');
			return;
		}

		const selected = advertisers.find(
			(advertiser) => advertiser?.nom_annonceur === value
		);
		if (selected == -1) {
			toast.error('Veuillez choisir un annonceur');
			return;
		}

		// If all validations pass, save the beverage
		handleSave();
		toast.success('Ajouté avec success');
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
						<div className='relative w-1/2 max-w-3xl mx-auto my-6 '>
							{/*content*/}
							<div
								className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[600px] w-[600px] overflow-scroll
                                    scrollbar  scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack '>
								{/*header*/}
								<div className='flex justify-center p-5 mx-auto border-b border-solid rounded-t border-slate-200'>
									<h3 className='text-3xl font-semibold text-dark-grey'>
										Ajouter annonce
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
										<div className='mb-4 '>
											<label
												className='block mb-2 ml-2 font-bold text-left text-gray-700'
												htmlFor='name'>
												Nom de
												l&apos;annonce
											</label>
											<input
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='name'
												type='text'
												placeholder="Entrez le nom de l'annonce"
												value={name}
												onChange={(e) =>
													setName(
														e.target
															.value
													)
												}
											/>
										</div>
										<div className='relative w-full mb-4'>
											<label
												className='block mb-2 ml-2 font-bold text-left text-gray-700'
												htmlFor='advertiser'>
												Annonceur :
											</label>
											<Autocomplete
												inputProps={{
													id: 'advertiser',
													placeholder:
														"Entrez nom de l'annonceur",
													className:
														'w-full ml-0  px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline',
												}}
												getItemValue={(
													item
												) =>
													item.nom_annonceur
												}
												items={
													filteredAdvertisers
												}
												value={value}
												onChange={(e) =>
													setValue(
														e.target
															.value
													)
												}
												onSelect={
													handleSelect
												}
												renderMenu={(
													children
												) => (
													<div className='absolute z-10 w-64 mt-2 bg-white border border-gray-300 rounded'>
														{children}
													</div>
												)}
												renderItem={(
													item,
													isHighlighted
												) => (
													<div
														key={
															item.id_annonceur
														}
														className={` cursor-pointer  mb-2  text-gray-700 item ${
															isHighlighted
																? 'highlighted bg-dark-grey text-white'
																: ''
														}`}>
														{
															item.nom_annonceur
														}
													</div>
												)}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block ml-2 font-bold text-left text-gray-700 '
												htmlFor='name'>
												Durée
												d&apos;affichage
											</label>
											<div>
												<div className='flex items-center justify-start'>
													<input
														className='w-20 px-3 py-2 mt-6 leading-tight text-gray-700 border rounded appearance-none lg:mr-8 focus:outline-none focus:shadow-outline'
														id='price'
														type='number'
														placeholder=''
														value={
															showTime
														}
														onChange={(
															e
														) =>
															setShowTime(
																e
																	.target
																	.value
															)
														}
													/>
													<div className='flex ml-2'>
														<div className='mr-2'>
															<input
																type='radio'
																name='duree'
																id='jours'
																value='jours'
																className='mr-1 appearance-none '
																onClick={
																	handleshowTimeUnitChange
																}
															/>
															<label
																htmlFor='jours'
																className={`flex items-center px-5 py-1 rounded-xl border border-gray-300  cursor-pointer ${
																	showTimeUnite ===
																	'jours'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Jours
															</label>
														</div>
														<div className='mr-2'>
															<input
																type='radio'
																name='duree'
																id='semaines'
																value='semaines'
																onClick={
																	handleshowTimeUnitChange
																}
																className='mr-1 appearance-none'
															/>
															<label
																htmlFor='semaines'
																className={`flex items-center px-5 py-1 rounded-xl bg-gray-200 border border-gray-300  cursor-pointer ${
																	showTimeUnite ===
																	'semaines'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Semaines
															</label>
														</div>
														<div>
															<input
																type='radio'
																name='duree'
																id='mois'
																value='mois'
																className='mr-1 appearance-none'
																onClick={
																	handleshowTimeUnitChange
																}
															/>
															<label
																htmlFor='mois'
																className={`flex items-center px-5 py-1 rounded-xl bg-gray-200 border border-gray-300 cursor-pointer ${
																	showTimeUnite ===
																	'mois'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Mois
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className='flex items-center justify-start my-8 '>
											<div className='mr-8 ml-2 font-bold text-gray-700'>
												{`Age cible :  ${minMaxAge[0]}
                                                             - ${minMaxAge[1]}`}
											</div>

											<Range
												values={minMaxAge}
												step={1}
												min={0}
												max={100}
												onChange={
													handleMinMaxAgeChange
												}
												renderTrack={({
													props,
													children,
												}) => (
													<div
														{...props}
														style={{
															...props.style,
															height: '6px',
															width: '70%',
															backgroundColor:
																'#343A49',
														}}>
														{children}
													</div>
												)}
												renderThumb={({
													props,
												}) => (
													<div
														{...props}
														style={{
															...props.style,
															height: '24px',
															width: '24px',
															borderRadius:
																'50%',
															backgroundColor:
																'#343A49',
														}}
													/>
												)}
											/>
										</div>
										<div className='mb-4 flex'>
											<label
												className='block ml-2 mr-8 mt-[28px] font-bold text-left text-gray-700 '
												htmlFor='name'>
												Sexe
											</label>
											<div>
												<div className='flex items-center justify-start'>
													<div className='flex ml-2'>
														<div className='mr-2'>
															<input
																type='radio'
																name='sexe'
																id='M'
																value='M'
																className='mr-1 appearance-none '
																onClick={
																	handleSexeChange
																}
															/>
															<label
																htmlFor='M'
																className={`flex items-center px-5 py-1 rounded-xl border border-gray-300  cursor-pointer ${
																	sexe ===
																	'M'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Hommes
															</label>
														</div>
														<div className='mr-2'>
															<input
																type='radio'
																name='sexe'
																id='F'
																value='F'
																onClick={
																	handleSexeChange
																}
																className='mr-1 appearance-none'
															/>
															<label
																htmlFor='F'
																className={`flex items-center px-5 py-1 rounded-xl bg-gray-200 border border-gray-300  cursor-pointer ${
																	sexe ===
																	'F'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Femmes
															</label>
														</div>
														<div>
															<input
																type='radio'
																name='sexe'
																id='B'
																value='B'
																className='mr-1 appearance-none'
																onClick={
																	handleSexeChange
																}
															/>
															<label
																htmlFor='B'
																className={`flex items-center px-5 py-1 rounded-xl bg-gray-200 border border-gray-300 cursor-pointer ${
																	sexe ===
																	'B'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Les
																deux
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='mb-4 flex items-center'>
											<label
												className='block ml-2 mr-8 mt-4 font-bold text-left text-gray-700 '
												htmlFor='name'>
												Type
											</label>
											<div>
												<div className='flex items-center justify-start'>
													<div className='flex ml-2'>
														<div className='mr-2'>
															<input
																type='radio'
																name='type'
																id='forfait'
																value='forfait'
																className='mr-1 appearance-none '
																onClick={
																	handleTypeChange
																}
															/>
															<label
																htmlFor='forfait'
																className={`flex items-center px-5 py-1 rounded-xl border border-gray-300  cursor-pointer ${
																	type ===
																	'forfait'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Forfait
															</label>
														</div>
														<div className='mr-2'>
															<input
																type='radio'
																name='type'
																id='reel'
																value='reel'
																onClick={
																	handleTypeChange
																}
																className='mr-1 appearance-none'
															/>
															<label
																htmlFor='reel'
																className={`flex items-center px-5 py-1 rounded-xl bg-gray-200 border border-gray-300  cursor-pointer ${
																	type ===
																	'reel'
																		? ' bg-slate-800 text-slate-50'
																		: ' bg-gray-50 text-gray-500'
																}`}>
																Réel
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className='mb-4'>
											<label
												className='block mb-2 ml-2 font-bold text-left text-gray-700'
												htmlFor='price'>
												Tarif
											</label>
											<div className='flex items-center gap-x-4'>
												<input
													className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
													id='price'
													type='number'
													placeholder='Entrez le prix de la Annonce'
													value={price}
													onChange={(
														e
													) =>
														setPrice(
															e
																.target
																.value
														)
													}
												/>
												<p className='text-dark-grey text-bold text-[18px]'>
													DA
												</p>
											</div>
										</div>

										<div className='mb-4'>
											<label
												className='block mb-2 ml-2 font-bold text-left text-gray-700'
												htmlFor='start-date'>
												Date de début
											</label>
											<input
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='start-date'
												type='date' // Change the type to 'date'
												placeholder='Entrez la date de début'
												value={startDate}
												onChange={(e) =>
													setStartDate(
														e.target
															.value
													)
												}
											/>
										</div>

										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='picture'>
												vidéo
											</label>

											<div className='relative flex items-center justify-between gap-8 '>
												{videoPath ? (
													<video
														controls
														//poster='/path/to/poster.jpg'
														height={
															300
														}
														width={
															300
														}
														alt='video'
														loading='lazy'>
														<source
															src={
																videoPath
															}
															type='video/mp4'
														/>
													</video>
												) : (
													<div className='w-48 h-48 bg-gray-200 rounded' />
												)}
												<input
													id='videoInput'
													type='file'
													accept='.mp4'
													onChange={
														handleFileInputChange
													}
													className='absolute inset-0 mt-2 w-full  opacity-0 cursor-pointer'
												/>
												<button
													className={`px-4 py-2 text-dark-gray ${
														videoFile
															? 'bg-scrollbarThumb text-white'
															: 'bg-gray-200'
													}  rounded hover:bg-blue-600 focus:outline-none`}
													onClick={(
														e
													) => {
														e.preventDefault();
													}}>
													Sélectionner un
													fichier
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
										sauvegarder
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
