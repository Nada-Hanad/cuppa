import React, { useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const InfoLine = ({ title, value }) => {
	return (
		<div className='flex pb-4 text-dark-grey font-bold w-full   items-center justify-start '>
			<label className='relative flex w-2/3 '>{title} :</label>
			<p>{value}</p>
		</div>
	);
};

export default function DetailsADModal({ Ad }) {
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

	return (
		<>
			<button
				className='self-center px-2 py-2 bg-dark-grey text-bold  rounded-xl text-white '
				type='button'
				onClick={() => setShowModal(true)}>
				Details
			</button>
			{showModal ? (
				<>
					<div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden outline-none focus:outline-none modal'>
						<div className='relative w-auto max-w-3xl mx-auto my-6'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none  h-[500px] w-[400px] '>
								{/*header*/}
								<div className='flex items-start justify-center p-5 mx-auto rounded-t'>
									<h3 className='text-3xl font-semibold text-dark-grey'>
										Détails de l&apos;annonce
									</h3>
								</div>
								{/*body*/}
								<div className='relative px-12  flex flex-col justify-start   w-full '>
									<InfoLine
										title='Nom'
										value={Ad.nom_annonce}
									/>
									<InfoLine
										title='Annonceur'
										value={
											Ad.id_annonceur_annonceur
												.nom_annonceur
										}
									/>
									<InfoLine
										title="durée d'affichage"
										value={
											Ad.duree_affichage +
											' jours'
										}
									/>
									<InfoLine
										title='Nombre des affichage'
										value={Ad.nombre_affichage}
									/>
									<InfoLine
										title='etat'
										value={Ad.etat_annonce}
									/>
									<InfoLine
										title='date de début'
										value={Ad.date_debut}
									/>
									<InfoLine
										title='sexe cible'
										value={Ad.sexe_cible}
									/>
								</div>

								<div className='flex items-center justify-center p-6 rounded-b'>
									<button
										className='w-5/12 px-2 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={() =>
											setShowModal(false)
										}>
										Annuler
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
