import Head from 'next/head';
import SearchBar from '../../components/shared/search/searchBar';
import Title from '../../components/shared/layout/title';
import BoissonCard from '../../components/AC/annonces/pubsCard';
import { useEffect, useState } from 'react';
import FilterSection from '../../components/shared/filters/filterSection';
import AddAdModal from '../../components/AC/annonces/addAd';
import { API_URL } from '../../config/api';
import axios from 'axios';

export default function Ads() {
	const [defaultData, setDefaultData] = useState([]);
	function handleSearch(enteredWord) {
		const searchTerms = enteredWord.toLowerCase().split(' ');
		const filteredAds = defaultData.filter((Ad) => {
			const nameLower = Ad.nom_annonce?.toLowerCase();
			return searchTerms.every((term) => nameLower?.includes(term));
		});
		console.log(defaultData);
		enteredWord == '' ? setAds(defaultData) : setAds(filteredAds);
	}
	const [Ads, setAds] = useState([]);
	const [Annoceurs, setAnnoceurs] = useState([
		{ id_annonceur: 1, nom_annonceur: 'Advertiser 1' },
		{ id_annonceur: 2, nom_annonceur: 'Advertiser 2' },
		{ id_annonceur: 3, nom_annonceur: 'Advertiser 3' },
		// Add more advertisers as needed
	]);
	const fetchAdvertisers = async () => {
		const token = localStorage.getItem('token');
		console.log(token);

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const response = await axios
			.get(`${API_URL}/api/ads/getAllAdvertisers/`, config)
			.catch((e) => console.log(e));
		if (response) {
			const advtisers = response.data;
			setAnnoceurs(advtisers);
		}
	};
	const fetchAdvertisements = async () => {
		const token = localStorage.getItem('token');

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		let Ads;
		axios.get(`${API_URL}/api/ads/getAllAdvertisements/`, config)
			.then((res) => {
				console.log(res.data);
				Ads = res.data;
				setAds(Ads);
				setDefaultData(Ads);
				console.log(`Ads-----------------------------`);
				console.log(Ads);
				console.log(`Ads-----------------------------`);
			})
			.catch((e) => console.log(e));
	};

	// fetch the ads after the compnonts is load

	useEffect(() => {
		fetchAdvertisements();
		fetchAdvertisers();
	}, []);

	return (
		<div className='flex flex-col items-center pt-8 text-center '>
			<Head>
				<title>Annoces</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Title title='Annoces' />

			<AddAdModal
				fetchAdvertisements={fetchAdvertisements}
				advertisers={Annoceurs}
			/>

			<div className='flex justify-between h-full gap-10 my-8'>
				<SearchBar
					placeholder={'Nom du Annoce...'}
					handleSearch={handleSearch}
				/>
				<FilterSection
					placeholders={{
						first: 'Min prix...',
						second: 'Max prix...',
					}}
					data={defaultData}
					setData={setAds}
					attribute={'prix_annonce'}
				/>
			</div>
			<div className='grid grid-cols-3 gap-12'>
				{Ads.map((Ad, i) => (
					<BoissonCard
						key={i}
						Ad={Ad}
						fetchAdvertisements={fetchAdvertisements}
					/>
				))}
			</div>
		</div>
	);
}
