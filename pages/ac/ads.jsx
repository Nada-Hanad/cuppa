import Head from 'next/head';
import DistributorCard from '../../components/ADM/distributorCard';
import FilterButton from '../../components/shared/filterButton';
import Input from '../../components/shared/input';
import SearchBar from '../../components/shared/searchBar';
import Title from '../../components/shared/title';
import BoissonCard from '../../components/AC/pubsCard';
import { useState } from 'react';
import FilterSection from '../../components/shared/filterSection';
import AddAdModal from '../../components/AC/addAd';

export default function Boissons() {
     const defaultData = [
          {
               id: 0,
               name: 'coffee beans',
               showTime: 'jours',
               price: 4.99,
               sexe: 'M',
               minAge: 10,
               maxAge: 20,
               videoPath:
                    'COFFEE COMMERCIAL ADVERTISEMENT - 7 miles roasters coffee beans ad.mp4',
          },
          {
               id: 1,
               name: 'Kia EV9',
               showTime: 'semaines',
               price: 5.99,
               minAge: 10,
               maxAge: 20,
               sexe: 'F',
               videoPath: 'Introducing the Kia EV9.mp4',
          },
          {
               id: 2,
               name: 'Diet Coke',
               showTime: 'mois',
               price: 3.99,
               minAge: 10,
               maxAge: 20,
               sexe: 'B',
               videoPath:
                    'Life is Short, Have a Diet Coke _ Because I Can _ Diet Coke GB.mp4',
          },

          {
               id: 3,
               name: 'Earl Grey Tea',
               showTime: 'jours',
               sexe: 'M',
               minAge: 10,
               maxAge: 20,
               price: 2.99,
               videoPath:
                    'Life is Short, Have a Diet Coke _ Because I Can _ Diet Coke GB.mp4',
          },
     ];
     function handleSearch(enteredWord) {
          const searchTerms = enteredWord.toLowerCase().split(' ');
          const filteredDrinks = defaultData.filter((drink) => {
               const nameLower = drink.name.toLowerCase();
               return searchTerms.every((term) => nameLower.includes(term));
          });
          setDrinks(filteredDrinks);
     }
     const [drinks, setDrinks] = useState(defaultData);

     return (
          <div className='flex flex-col items-center pt-8 text-center'>
               <Head>
                    <title>Annoces</title>
                    <link rel='icon' href='/favicon.ico' />
               </Head>
               <Title title='Annoces' />

               <AddAdModal drinks={drinks} setDrinks={setDrinks} />

               <div className='flex justify-between h-full gap-10 my-8'>
                    <SearchBar
                         placeholder={'Nom du Annoce...'}
                         handleSearch={handleSearch}
                    />
                    <FilterSection
                         placeholders={{
                              first: 'Min Age...',
                              second: 'Max Age...',
                         }}
                         data={defaultData}
                         setData={setDrinks}
                         attribute={'price'}
                    />
               </div>
               <div className='grid grid-cols-3 gap-12'>
                    {drinks.map((drink, i) => (
                         <BoissonCard
                              key={i}
                              drink={drink}
                              drinks={drinks}
                              setDrinks={setDrinks}
                         />
                    ))}
               </div>
          </div>
     );
}
