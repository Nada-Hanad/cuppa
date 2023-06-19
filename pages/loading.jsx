import React from 'react';

const LoadingPage = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='w-24 h-24 rounded-full animate-bounce '>
				<img
					alt='logo'
					src='icons/blacklogo.svg'
					className='text-dark-grey'></img>
			</div>
			<p className='text-[24px] mt-6 font-bold text-darkgrey'>CUPPA</p>
		</div>
	);
};

export default LoadingPage;
