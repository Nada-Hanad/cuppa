import Head from "next/head";
import FilterButton from "../../../components/shared/filters/filterButton";
import Input from "../../../components/shared/inputs/input";
import SearchBar from "../../../components/shared/search/searchBar";
import Title from "../../../components/shared/layout/title";
import FilterItem from "../../../components/shared/filters/filterItem";
import ReclamationCard from "../../../components/AC/reclamationCard";
import { useAsyncDebounce } from 'react-table';
//import Head from 'next/head';
import Image from 'next/image';

import { DataTable } from '../../../components/shared/tables/table';

import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useGlobalFilter, useTable } from 'react-table';
//import SearchBar from '../../components/shared/search/searchBar';
import AddAdvertiserModal from '../../../components/AC/addAdvertiser';
import { API_URL } from '../../../config/api';

import { SearchTableBar } from '../../../components/shared/search/searchTableBar';
//import Title from '../../components/shared/layout/title';
import { useRouter } from "next/router";
import ValiderReclamation from "../../../components/AC/validerReclamation";
import NePasvaliderReclamation from "../../../components/AC/NePasvaliderReclamation";
import Send from "../../../components/AC/sendMail";     


export default function DetailsReclamations() {
	////////////---------------------- Dynamic table -------------------------------.----///////////////////////////////////////////////////////////////////////////////////////////////
	const router = useRouter();
	
	  



	const { detailsReclamations } = router.query;
	
	const [Reclamations, setReclamations] = useState([]);
	const [defaultData, setDefaultData] = useState([]);
	
	const fetchReclamations = async () => {
		const token = localStorage.getItem('token');

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const response = await axios
			.get(`${API_URL}/reclamation/${detailsReclamations}/getReclamation/`, config)
			.catch((e) => console.log(e));
		if (response) {
			console.log(response);
			 
			const reclamation = response.data;
			setReclamations(reclamation);
			setDefaultData(reclamation);
		}
	};
	
	/////////////////////////////
	

	
	//////////////////--------------API EXAMPLE----------------------//////////////////////////////////////////////////////////////////////////
	

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	

	useEffect(() => {
		console.log('fetchreclamations');
		fetchReclamations();
	
		console.log('********************************');
	}, []);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [dataF,setDataf] = useState({
		name: Reclamations.nom_consommateur,
		amount: Reclamations.prix_cmd,
		email: Reclamations.mail_consommateur,
		description: 'Demande dexcuses suite à une commande de boisson mal présentée Cher(e) service clientèle j espère que vous vous portez bien. on se permet de vous contacter aujourd hui afin d exprimer ma déception quant à une récente commande de boissons. Je souhaite également solliciter des excuses pour cette expérience désagréable. ',
		validate:false,
	  })
	  const [dataT,setDatat] = useState({
		name: Reclamations.nom_consommateur,
		amount: Reclamations.prix_cmd,
		email: Reclamations.mail_consommateur,
		description: 'voici le mail a envoyer',
		validate:true,
	  })
	//////////////////////////////////////${Reclamations.id_reclamation}//////////////////////////////////////////////
	return (
		<div className='flex flex-col items-center pt-4 overflow-x-hidden text-center gap-11'>
			<Head>
			
				
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Title title={`Détails Réclamation`}  />





			<div className='flex w-[1000px] justify-between'>
      <div className='w-[300px] h-[100px] rounded-[10px] bg-white border-[1px] border-[#343A49] text-[#343A49] font-bold text-xl flex items-center justify-center'>
	  Numéro Réclamations  : {Reclamations.id_reclamation}
      </div>
	  <div className={`w-[300px] h-[100px] rounded-[10px] border-[1px] text-white font-bold text-xl flex items-center justify-center ${
  Reclamations.etat_reclamation === 'Remboursée' ? 'bg-green-500' :  Reclamations.etat_reclamation === 'Non-Remboursée' ?'bg-red-500': 'bg-orange-500'
}`}>
         {Reclamations.etat_reclamation}
      </div>
    </div>
	








	<div className='flex w-[1000px] justify-between items-center'>
  <div className='font-bold text-3xl'>
    <strong> Type:</strong>
  </div>
  <div className='w-[300px] h-[90px] rounded-[10px] bg-white border-[1px] border-[#343A49] text-[#343A49] font-bold text-xl flex items-center justify-center'>
    {Reclamations.type_reclamation}
  </div>
</div>





 






	<div className='w-3/6 h-[130px] rounded-[10px] flex flex-col justify-start bg-white border-[1px] border-[#343A49] text-[#343A49] font-bold text-xl'>
  <br />
  <div className='font-bold text-3xl'>
    <strong> Description</strong>
  </div>
  <div className='ml-5 text-justify'>
    {Reclamations.description_reclamation}
  </div>
</div>






<div className='flex w-[1050px] justify-between'>
  <div className='w-2/4 h-auto rounded-[10px] bg-white border-[1px] border-[#343A49] text-justify  text-[#343A49] font-bold text-xl flex items-center justify-center'>
  Détails Consommateur
  <br />
  <br />Prenom : {Reclamations.prenom_consommateur}
  <br />Nom : {Reclamations.nom_consommateur}
  <br />Numbers de Commande : {Reclamations.numberOfCommande}
  <br />Numbers de Reclamations : {Reclamations.numberOfReclamation}
  <br />
  </div>
  <div className='w-2/4 h-auto rounded-[10px] bg-white border-[1px] border-[#343A49] text-justify  text-[#343A49] font-bold text-xl flex items-center justify-center ml-4'>
  Détails Commande
  <br />
  <br />Numero : {Reclamations.id_cmd}
  <br />Date : {Reclamations.time_cmd}
  <br />Prix : {Reclamations.prix_cmd}
  <br />Status: {Reclamations.etat_cmd}
  <br />
  </div>
 
</div>







	
			

	

			






{
  Reclamations.etat_reclamation === 'Non-traitée' && (Reclamations.type_reclamation === 'Commande non reçue' ||Reclamations.type_reclamation === 'Commande non complete' )? (
    <div className="flex justify-end space-x-5">
      <ValiderReclamation idReclamations={Reclamations.id_reclamation} fetchReclamations={fetchReclamations} data={dataT} />
      <NePasvaliderReclamation idReclamations={Reclamations.id_reclamation} fetchReclamations={fetchReclamations} data={dataF} />
    </div>
  ) : Reclamations.etat_reclamation === 'Non-traitée'  && (Reclamations.type_reclamation === 'Commande insatisfaisante') ? (
	<Send idReclamations={Reclamations.id_reclamation} fetchReclamations={fetchReclamations} data={dataF} />
   
  ) : (
   null
  )
}


  

   





		</div>
	);
	
}
