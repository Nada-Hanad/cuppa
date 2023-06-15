import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';
import Head from 'next/head';
import Title from '../../components/shared/layout/title';

const InfoLine = ({ title, value }) => {
	return (
		<div className='flex pb-4 text-dark-grey font-bold w-full   items-center justify-start '>
			<label className='relative flex w-2/3 '>{title} :</label>
			<p>{value}</p>
		</div>
	);
};

export default function Profil() {
	const [prfile, setProfile] = useState({});
	const fetchProfile = async () => {
		const token = localStorage.getItem('token');
		console.log(token);

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const response = await axios
			.get(`${API_URL}/api/account.management/getProfil/`, config)
			.catch((e) => console.log(e));
		if (response) {
			const profile = response.data;
			console.log(profile.data);
			setProfile(profile.data);
		}
	};
	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<div>
			<div className='flex flex-col items-center justify-center   pt-8 text-center'>
				<Head>
					<title>Profil</title>
				</Head>
				<Title title='Profile' />
			</div>
			<div
				className='flex flex-col  pl-8  items-start justify-start mx-auto bg-slate-50 my-24 pt-8 text-center shadow-lg sm:w-full md:2/3 lg:w-1/3 
        min-h-96 '>
				<div className='w-full mb-12'>
					<img
						alt='profile'
						className='object-cover rounded-sm w-48 h-48 mx-auto '
						src='/icons/userIcon.png'
					/>
				</div>

				<InfoLine
					title='Identifient   '
					value={prfile.id_utilisateur}
				/>
				<InfoLine
					title="Nom d 'utilisateur   "
					value={prfile.username_utilisateur}
				/>
			</div>
		</div>
	);
}
