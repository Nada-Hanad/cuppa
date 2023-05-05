import React, { useEffect } from 'react';
import AddIngredients from './addIngredients';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Range } from 'react-range';

export default function AddBoissonModal({ drinks, setDrinks }) {
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
     const [name, setName] = React.useState('');
     const [unite, setUnite] = React.useState('');
     const [minAge, setMinAge] = React.useState('');
     const [maxAge, setMaxAge] = React.useState('');
     const [sexe, setSexe] = React.useState('');
     const [price, setPrice] = React.useState('');
     const [videoPath, setVideoPath] = React.useState('');

     const [minMaxAge, setMminMaxAge] = React.useState([20, 40]);

     const handleMinMaxAgeChange = (newValue) => {
          setMminMaxAge(newValue);
     };
     const handleUniteChange = (e) => {
          e.preventDefault();
          setUnite(e.target.value);
     };
     const handleSexeChange = (e) => {
          e.preventDefault();
          setSexe(e.target.value);
     };
     const handleSave = () => {
          const newDrinks = [
               ...drinks,
               {
                    id: drinks.length + 1,
                    name,
                    price,
                    videoPath,
                    unite,
                    sexe,
                    minAge,
                    maxAge,
               },
          ];
          setDrinks(newDrinks);

          // Reset the form
          setName('');
          setPrice('');
          setSexe('');
          setUnite('');
          setMaxAge('');
          setMinAge('');
          setVideoPath('');
          setShowModal(false);
     };
     const handleImageChange = (e) => {
          const file = e.target.files[0];
          const input = e.target.value;

          if (file) {
               const reader = new FileReader();
               reader.readAsDataURL(file);

               reader.onload = () => {
                    setImage(reader.result);
               };
          } else if (input) {
               setImage(input);
          }
     };
     const handleSubmit = (e) => {
          e.preventDefault();

          if (!price) {
               toast.error('Veuillez entrer le prix de la Annonce');
               return;
          }
          if (price < 0) {
               toast.error('Veuillez entrer un prix positif');
               return;
          }

          if (!videoPath) {
               toast.error('Veuillez télécharger une video ');
               return;
          }

          // If all validations pass, save the beverage
          handleSave();
          toast.success('Ajouté avec success');
     };

     return (
          <>
               <button
                    className='px-4 py-4 bg-dark-grey rounded-xl text-white self-end mr-12'
                    type='button'
                    onClick={() => setShowModal(true)}>
                    Ajouter
               </button>
               {showModal ? (
                    <>
                         <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none modal'>
                              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                                   {/*content*/}
                                   <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[600px] w-[600px] overflow-scroll'>
                                        {/*header*/}
                                        <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                                             <h3 className='text-3xl font-semibold'>
                                                  Ajouter un Annonce
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
                                        <div className='relative p-6 flex-auto'>
                                             <form>
                                                  <div className='mb-4'>
                                                       <label
                                                            className='block text-gray-700 font-bold mb-2'
                                                            htmlFor='name'>
                                                            Nom de la Annonce
                                                       </label>
                                                       <input
                                                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='name'
                                                            type='text'
                                                            placeholder='Entrez le nom de la Annonce'
                                                            value={name}
                                                            onChange={(e) =>
                                                                 setName(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       />
                                                  </div>

                                                  <div className='mb-4'>
                                                       <label
                                                            className='block text-gray-700 font-bold '
                                                            htmlFor='name'>
                                                            Duree d’affichage
                                                       </label>

                                                       <div className='flex items-center  justify-center'>
                                                            <div className='flex ml-2 items-center '>
                                                                 <div className='mr-2'>
                                                                      <input
                                                                           type='radio'
                                                                           name='unite'
                                                                           id='jours'
                                                                           value='jours'
                                                                           className='appearance-none mr-1'
                                                                           onClick={
                                                                                handleUniteChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='jours'
                                                                           className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                unite ===
                                                                                'jours'
                                                                                     ? ' text-red bg-gray-300'
                                                                                     : ''
                                                                           }`}>
                                                                           jours
                                                                      </label>
                                                                 </div>
                                                                 <div className='mr-2'>
                                                                      <input
                                                                           type='radio'
                                                                           name='unite'
                                                                           id='semaines'
                                                                           value='semaines'
                                                                           onClick={
                                                                                handleUniteChange
                                                                           }
                                                                           className='appearance-none mr-1'
                                                                      />
                                                                      <label
                                                                           htmlFor='semaines'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
                                                                                unite ===
                                                                                'semaines'
                                                                                     ? ' text-red bg-gray-300'
                                                                                     : ''
                                                                           }`}>
                                                                           semaines
                                                                      </label>
                                                                 </div>
                                                                 <div>
                                                                      <input
                                                                           type='radio'
                                                                           name='unite'
                                                                           id='mois'
                                                                           value='mois'
                                                                           className='appearance-none mr-1'
                                                                           onClick={
                                                                                handleUniteChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='mois'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                unite ===
                                                                                'mois'
                                                                                     ? ' text-red bg-gray-300'
                                                                                     : ''
                                                                           }`}>
                                                                           mois
                                                                      </label>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className='mb-4'>
                                                       <label
                                                            className='block text-gray-700 font-bold '
                                                            htmlFor='name'>
                                                            sexe cible
                                                       </label>

                                                       <div className='flex items-center justify-center'>
                                                            <div className='flex ml-2'>
                                                                 <div className='mr-2'>
                                                                      <input
                                                                           type='radio'
                                                                           name='sexe'
                                                                           id='M'
                                                                           value='M'
                                                                           className='appearance-none mr-1'
                                                                           onClick={
                                                                                handleSexeChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='M'
                                                                           className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                sexe ===
                                                                                'M'
                                                                                     ? ' text-red bg-gray-300'
                                                                                     : ''
                                                                           }`}>
                                                                           Masculaine
                                                                      </label>
                                                                 </div>
                                                                 <div className='mr-2'>
                                                                      <input
                                                                           type='radio'
                                                                           name='sexe'
                                                                           id='F'
                                                                           value='F'
                                                                           onClick={
                                                                                handleSexeChange
                                                                           }
                                                                           className='appearance-none mr-1'
                                                                      />
                                                                      <label
                                                                           htmlFor='F'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
                                                                                sexe ===
                                                                                'F'
                                                                                     ? ' text-red bg-gray-300'
                                                                                     : ''
                                                                           }`}>
                                                                           Feminane
                                                                      </label>
                                                                 </div>
                                                                 <div>
                                                                      <input
                                                                           type='radio'
                                                                           name='sexe'
                                                                           id='B'
                                                                           value='B'
                                                                           className='appearance-none mr-1'
                                                                           onClick={
                                                                                handleSexeChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='B'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                sexe ===
                                                                                'B'
                                                                                     ? ' text-red bg-gray-300'
                                                                                     : ''
                                                                           }`}>
                                                                           Les
                                                                           deux
                                                                      </label>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className='flex justify-start items-center my-8 '>
                                                       <div className='mr-8  text-gray-700 font-bold'>
                                                            {`Age cible :  ${minMaxAge[0]}
                                                             - ${minMaxAge[1]}`}
                                                       </div>

                                                       <Range
                                                            values={minMaxAge}
                                                            step={1}
                                                            min={0}
                                                            max={100}
                                                            onChange={
                                                                 handleMinMaxAgeChange
                                                            }
                                                            renderTrack={({
                                                                 props,
                                                                 children,
                                                            }) => (
                                                                 <div
                                                                      {...props}
                                                                      style={{
                                                                           ...props.style,
                                                                           height: '6px',
                                                                           width: '70%',
                                                                           backgroundColor:
                                                                                '#343A49',
                                                                      }}>
                                                                      {children}
                                                                 </div>
                                                            )}
                                                            renderThumb={({
                                                                 props,
                                                            }) => (
                                                                 <div
                                                                      {...props}
                                                                      style={{
                                                                           ...props.style,
                                                                           height: '20px',
                                                                           width: '20px',
                                                                           borderRadius:
                                                                                '50%',
                                                                           backgroundColor:
                                                                                '#999',
                                                                      }}
                                                                 />
                                                            )}
                                                       />
                                                  </div>

                                                  <div className='mb-4'>
                                                       <label
                                                            className='block text-gray-700 font-bold mb-2'
                                                            htmlFor='price'>
                                                            Prix
                                                       </label>
                                                       <input
                                                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='price'
                                                            type='number'
                                                            placeholder='Entrez le prix de la Annonce'
                                                            value={price}
                                                            onChange={(e) =>
                                                                 setPrice(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       />
                                                  </div>
                                                  <div className='mb-4'>
                                                       <label
                                                            className='block text-gray-700 font-bold mb-2'
                                                            htmlFor='picture'>
                                                            video
                                                       </label>
                                                       <input
                                                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='picture'
                                                            type='text'
                                                            placeholder="Entrez l'URL de l'image de la Annonce"
                                                            value={videoPath}
                                                            onChange={(e) =>
                                                                 setImage(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       />
                                                       <p className='p-4'>
                                                            Ou bien
                                                       </p>
                                                       <div className='flex justify-between items-center gap-8 '>
                                                            {videoPath ? (
                                                                 <Image
                                                                      src={
                                                                           image
                                                                      }
                                                                      alt='Boisson'
                                                                      className='h-48 w-full object-cover rounded'
                                                                      height={
                                                                           300
                                                                      }
                                                                      width={
                                                                           300
                                                                      }
                                                                 />
                                                            ) : (
                                                                 <div className='h-48 w-48 bg-gray-200 rounded' />
                                                            )}
                                                            <input
                                                                 id='image'
                                                                 type='file'
                                                                 accept='.jpg, .jpeg, .png'
                                                                 onChange={
                                                                      handleImageChange
                                                                 }
                                                                 className='mt-2'
                                                            />
                                                       </div>
                                                  </div>
                                             </form>
                                        </div>

                                        <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                                             <button
                                                  className='bg-dark-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                  type='button'
                                                  onClick={handleSubmit}>
                                                  Sauvegarder
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
