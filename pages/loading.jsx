import React from 'react';

const LoadingPage = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='animate-bounce rounded-full h-24 w-24 '>
				<img
					src='icons/blacklogo.svg'
					className='text-dark-grey'></img>
			</div>
			<p className='text-[24px] mt-6 font-bold text-darkgrey'>CUPPA</p>
		</div>
	);
};

export default LoadingPage;
