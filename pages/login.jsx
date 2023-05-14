import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../config/api';
export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rmemberMe, setRmemberMe] = useState('');
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${API_URL}/login`, {
				username,
				password,
				rmemberMe,
			});

			let token = response.data.token;
			let role = response.data.role;
			// Store the token in local storage or cookies
			localStorage.setItem('token', token);
			localStorage.setItem('role', role);
			// Redirect to another page
			console.log(`role`);
			console.log(role);
			if (role == 'SADM') {
				router.push('/sadm');
			} else if (role == 'AC') {
				router.push('/ac/ads');
			} else if (role == 'decideur') {
				router.push('/decideur');
			} else if (role == 'ADM') {
				router.push('/adm');
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='relative w-full h-screen'>
			<img
				className='absolute w-full h-full -z-20 '
				src='/icons/loginBg.png'
			/>
			<div className='absolute w-full h-full bg-black -z-10 bg-opacity-30 ' />

			<div className='flex flex-col items-center justify-center w-full h-full gap-20 xl:flex-row '>
				<div className='flex flex-col items-center justify-center'>
					<div className='flex items-center justify-center'>
						<img
							src='icons/whiteLogo.svg'
							className='w-48 h-48'
						/>
						<h2 className='font-bold tracking-widest mt-8 text-[70px] text-white'>
							CUPPA
						</h2>
					</div>
					<p className='text-[36px] text-white font-bold'>
						Pouring Happiness Into Every Cup
					</p>
				</div>
				<div className='flex w-3/12 bg-white rounded-[20px] h-2/3 justify-center items-center flex-col'>
					<img src='icons/blackLogo.svg' className='w-20 h-24' />
					<h3 className='text-black my-4 font-bold text-[20px]'>
						Welcome To CUPPA
					</h3>
					<form className='flex flex-col'>
						<label className='my-1 font-normal text-dark-gray '>
							UserName
						</label>
						<input
							type='text '
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							className='px-4 py-2 border border-2 rounded-xl border-dark-gray '
						/>
						<label className='my-1 font-normal text-dark-gray '>
							Password
						</label>
						<input
							type='password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
							className='px-4 py-2 border border-2 rounded-xl border-dark-gray '
						/>
						<div className='flex items-center justify-start '>
							<input
								type='checkbox'
								onClick={setRmemberMe}
								className='w-4 h-4'
							/>
							<label className='my-1 ml-3 font-normal text-dark-gray '>
								Se Souvenir de moi
							</label>
						</div>
						<button
							type='submit'
							className='my-2 w-full h-10 bg-[#F18C4F] rounded-lg'
							onClick={handleSubmit}>
							Log in
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
