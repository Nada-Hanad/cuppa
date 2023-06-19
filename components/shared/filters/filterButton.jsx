import Image from 'next/image';

export default function FilterButton({ onClick }) {
	return (
		<div
			className=' rounded-xl text-dark-grey px-4 py-2 flex gap-4 border-2 border-black w-32 items-center cursor-pointer '
			onClick={onClick}>
			<Image
				height={30}
				width={30}
				src='/icons/filter.svg'
				alt='Filter icon'></Image>
			Filtrer
		</div>
	);
}
