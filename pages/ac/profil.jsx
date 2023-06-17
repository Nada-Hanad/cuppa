import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';
import Head from 'next/head';
import Title from '../../components/shared/layout/title';
import Image from 'next/image';

const InfoLine = ({ title, value }) => {
	return (
		<div className='flex items-center justify-start w-full pb-4 font-bold text-dark-grey '>
			<label className='relative flex w-2/3 '>{title} :</label>
			<p>{value}</p>
		</div>
	);
};

export default function Profil() {
	const [profil, setProfile] = useState({});
	const fetchProfile = async () => {
		const token = localStorage.getItem('token');
		console.log(token);

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const response = await axios
			.get(
				`${API_URL}/api/account.management/getProfileWithClient/`,
				config
			)
			.catch((e) => console.log(e));
		if (response) {
			const profil = response.data;
			console.log(profil.data);
			setProfile(profil.data);
		}
	};
	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<div>
			<div className='flex flex-col items-center justify-center pt-8 text-center'>
				<Head>
					<title>Profil</title>
				</Head>
				<Title title='Profile' />
			</div>
			<div className='flex flex-col items-start justify-start pt-8 pl-8 mx-auto mt-8 mb-24 text-center shadow-lg bg-slate-50 sm:w-full md:2/3 lg:w-1/3 min-h-96 '>
				<div className='w-full mb-12'>
					<Image
						alt='profile'
						height={48}
						width={48}
						className='object-cover w-48 h-48 mx-auto rounded-sm '
						src='/icons/userIcon.png'
					/>
				</div>

				<InfoLine
					title='Identifient   '
					value={profil?.id_utilisateur}
				/>
				<InfoLine
					title="Nom d 'utilisateur   "
					value={profil?.username_utilisateur}
				/>
				<InfoLine
					title='Role   '
					value={profil?.role?.libelle_role}
				/>
				<InfoLine
					title='Nom   '
					value={profil?.profil?.nom_utilisateur}
				/>
				<InfoLine
					title='Prénom   '
					value={profil?.profil?.prenom_utilisateur}
				/>
				<InfoLine
					title='Sexe   '
					value={
						profil?.profil?.sexe_utilisateur == 'M'
							? 'Homme'
							: 'Femme'
					}
				/>
				<InfoLine
					title='Clinet  '
					value={profil?.client?.nom_client}
				/>
				<InfoLine
					title='Superviseur  '
					value={profil?.supervisor?.profil?.nom_utilisateur}
				/>
			</div>
		</div>
	);
}
