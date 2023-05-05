import React, { useEffect } from 'react';
import AddIngredients from './addIngredients';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RangeInput from './RangeInput';
import { Range } from 'react-range';

export default function DeleteAnnonceModal({ drink, drinks, setDrinks }) {
     const [showModal, setShowModal] = React.useState(false);

     useEffect(() => {
          function handleClickOutside(event) {
               if (event.target.classList.contains('modal')) {
                    setShowModal(false);
               }
          }

          window.addEventListener('click', handleClickOutside);
          return () => {
               window.removeEventListener('click', handleClickOutside);
          };
     }, []);
     const [name, setName] = React.useState(drink.name);
     const [unite, setUnite] = React.useState(drink.showTime);
     const [minAge, setMinAge] = React.useState(drink.minAge);
     const [maxAge, setMaxAge] = React.useState(drink.maxAge);
     const [sexe, setSexe] = React.useState(drink.sexe);
     const [price, setPrice] = React.useState(drink.price);
     const [videoPath, setVideoPath] = React.useState(drink.videoPath);
     const [value, setValue] = React.useState({ values: [5, 10] });

     const handleSave = () => {
          const updatedAds = drinks.filter((e) => e.id !== drink.id);
          setDrinks(updatedAds);

          // Reset the form
          setShowModal(false);
     };

     const handleSubmit = (e) => {
          e.preventDefault();

          // If all validations pass, save the beverage
          handleSave();
          toast.success('Supperimeé avec success');
     };

     return (
          <>
               <button
                    className='px-4 py-2  text-dark-grey self-center '
                    type='button'
                    onClick={() => setShowModal(true)}>
                    <Image
                         className='text-dark-grey'
                         src='/icons/darkDeleteIcon.svg'
                         width={32}
                         height={32}
                    />
               </button>
               {showModal ? (
                    <>
                         <div className='justify-center items-center flex  overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none modal'>
                              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                                   {/*content*/}
                                   <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[400px] w-[400px] '>
                                        {/*header*/}
                                        <div className='flex items-start justify-between p-5  rounded-t'>
                                             <h3 className=' text-3xl font-semibold'>
                                                  Supprimer L&apos;annonce
                                             </h3>
                                             <button
                                                  className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                                  onClick={() =>
                                                       setShowModal(false)
                                                  }>
                                                  <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                                       ×
                                                  </span>
                                             </button>
                                        </div>
                                        {/*body*/}
                                        <div className='relative p-12 mx-auto flex rounded-[20px] border-slate-800 border-1 border w-8/12 bg-[#EBEEF3]'>
                                             <p className='font-bold text-dark-grey text-center text-[20px]'>
                                                  {` Voulez_vous supprimer
                                                  l’annonce de ${drink.name} ? `}
                                             </p>
                                        </div>

                                        <div className='flex items-center justify-between p-6  rounded-b'>
                                             <button
                                                  className='bg-dark-grey text-white w-5/12 font-bold uppercase text-sm px-2 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                  type='button'
                                                  onClick={() =>
                                                       setShowModal(false)
                                                  }>
                                                  Annuler
                                             </button>
                                             <button
                                                  className='bg-dark-grey text-white w-5/12 font-bold uppercase text-sm px-2 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                  type='button'
                                                  onClick={handleSubmit}>
                                                  Confirmer
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                    </>
               ) : null}
          </>
     );
}
