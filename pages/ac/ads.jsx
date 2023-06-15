import Head from 'next/head';
import SearchBar from '../../components/shared/search/searchBar';
import Title from '../../components/shared/layout/title';
import BoissonCard from '../../components/AC/annonces/pubsCard';
import { useEffect, useState } from 'react';
import FilterItem from '../../components/shared/filters/filterItem';
import FilterSection from '../../components/shared/filters/filterSection';
import AddAdModal from '../../components/AC/annonces/addAd';
import { API_URL } from '../../config/api';
import axios from 'axios';

export default function Ads() {
	const [defaultData, setDefaultData] = useState([]);
	const [AdvertisersList, setAdvertisersList] = useState([]);
	const [Ads, setAds] = useState([]);
	function handleSearch(enteredWord) {
		const searchTerms = enteredWord.toLowerCase().split(' ');
		const filteredAds = defaultData.filter((Ad) => {
			const nameLower = Ad.nom_annonce?.toLowerCase();
			return searchTerms.every((term) => nameLower?.includes(term));
		});
		console.log(defaultData);
		enteredWord == '' ? setAds(defaultData) : setAds(filteredAds);
	}

	const fetchAdvertisers = async () => {
		const token = localStorage.getItem('token');

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const response = await axios
			.get(`${API_URL}/api/ads/getAllAdvertisers/`, config)
			.catch((e) => console.log(e));
		if (response) {
			const advertisers = response.data;

			setAdvertisersList(advertisers);

			console.log(`advertisers ::::::2`);
			console.log(advertisers);
			console.log(AdvertisersList);
			console.log(`advertisers :::::3`);
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

	useEffect(() => {
		console.log('changed :', AdvertisersList);
	}, [AdvertisersList]);
	return (
		<div className='flex flex-col items-center pt-8 text-center '>
			<Head>
				<title>Annoces</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Title title='Annoces' />

			<AddAdModal
				fetchAdvertisements={fetchAdvertisements}
				advertisers={AdvertisersList}
			/>
			<div className='w-full flex justify-end'>
				<div className='flex w-2/3  items-center justify-end   h-full gap-x-4 my-8'>
					<SearchBar
						placeholder={`Nom de l'annoce...`}
						handleSearch={handleSearch}
					/>
					<FilterItem
						placeholders={'Annonceur'}
						list={AdvertisersList}
						data={defaultData}
						setData={setAds}
						attributeData={'id_annonceur'}
						attributeListToShow={'nom_annonceur'}
						attributeListToCompare={'id_annonceur'}
					/>
					<FilterItem
						placeholders={'etat'}
						list={[
							{ state: 'pending' },
							{ state: 'active' },
							{ state: 'expired' },
						]}
						data={defaultData}
						setData={setAds}
						attributeData={'etat_annonce'}
						attributeListToShow={'state'}
						attributeListToCompare={'state'}
					/>
					<FilterItem
						placeholders={'sexe'}
						list={[
							{ sexe: 'Hommes', codage: 'M' },
							{ sexe: 'Femmes', codage: 'F' },
							{ sexe: 'Les deux', codage: 'B' },
						]}
						data={defaultData}
						setData={setAds}
						attributeData={'sexe_cible'}
						attributeListToShow={'sexe'}
						attributeListToCompare={'codage'}
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
			</div>

			<div className='grid grid-cols-3 gap-12'>
				{Ads.map((Ad, i) => (
					<BoissonCard
						key={i}
						Ad={Ad}
						fetchAdvertisements={fetchAdvertisements}
						advertisers={AdvertisersList}
					/>
				))}
			</div>
		</div>
	);
}
