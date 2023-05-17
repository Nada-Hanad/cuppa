import React, { useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_URL } from '../../config/api';

export default function DeleteAdvertiserModal({
	name,
	AdervtiserId,
	fetchAdvertisers,
}) {
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

	const handleSave = async () => {
		// const updatedAds = drinks.filter((e) => e.id !== drink.id);
		//  setDrinks(updatedAds);

		try {
			const res = await axios.post(
				`${API_URL}/api/ads/deleteAdvertiser/${AdervtiserId}`,
				{}
			);
			console.log(`deleted res.data`);

			console.log(res.data);
		} catch (err) {
			console.error(err);
		}
		fetchAdvertisers();
		setShowModal(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// If all validations pass, save the beverage
		handleSave();
		toast.success('Supperimeé avec success');
	};

	return (
		<>
			<button
				className='self-center px-2 py-2 text-dark-grey '
				type='button'
				onClick={() => setShowModal(true)}>
				<Image
					className='text-dark-grey'
					src='/icons/darkDeleteIcon.svg'
					width={26}
					height={26}
				/>
			</button>
			{showModal ? (
				<>
					<div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden outline-none focus:outline-none modal'>
						<div className='relative w-auto max-w-3xl mx-auto my-6'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[400px] w-[400px] '>
								{/*header*/}
								<div className='flex  items-start justify-center  mx-auto p-5 rounded-t'>
									<h3 className='text-3xl font-semibold  text-dark-grey'>
										Supprimer l&apos;annonceur
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
								<div className='relative p-12 mx-auto flex rounded-[20px] border-slate-800 border-1 border w-8/12 bg-[#EBEEF3]'>
									<p className='font-bold text-dark-grey text-center text-[20px]'>
										{` Voulez_vous supprimer
                                                  l’annonceur  ${name}? `}
									</p>
								</div>

								<div className='flex items-center justify-between p-6 rounded-b'>
									<button
										className='w-5/12 px-2 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={() =>
											setShowModal(false)
										}>
										Annuler
									</button>
									<button
										className='w-5/12 px-2 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={handleSubmit}>
										Confirmer
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
