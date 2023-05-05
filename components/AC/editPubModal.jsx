import React, { useEffect } from 'react';
import AddIngredients from './addIngredients';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RangeInput from './RangeInput';
import { Range } from 'react-range';

export default function EditAnnonceModal({ drink, drinks, setDrinks }) {
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

     const [minMaxAge, setMminMaxAge] = React.useState([
          drink.minAge,
          drink.maxAge,
     ]);
     const [sexe, setSexe] = React.useState(drink.sexe);
     const [price, setPrice] = React.useState(drink.price);
     const [videoPath, setVideoPath] = React.useState(drink.videoPath);

     const handleSave = () => {
          const updatedAds = drinks.map((e) => {
               if (e.id === drink.id) {
                    return {
                         ...drink,
                         name,
                         price,
                         videoPath,
                         unite,
                         sexe,
                         minAge: minMaxAge[0],
                         maxAge: minMaxAge[1],
                    };
               } else {
                    return e;
               }
          });
          setDrinks(updatedAds);

          // Reset the form
          setShowModal(false);
     };

     /*
     const handleVideoChange = async (e) => {
      const file = e.target.files[0];
    
      if (file) {
        const formData = new FormData();
        formData.append('video', file);
        try {
          const response = await fetch('/api/save-video', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result);
          } else {
            throw new Error('Error saving video');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    */

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

     const handleVideoChange = async (e) => {
          const file = e.target.files[0];
          const input = e.target.value;

          if (file) {
               const reader = new FileReader();
               await new Promise((resolve) => {
                    reader.onload = () => {
                         setVideoPath(reader.result);
                         resolve();
                    };
                    reader.readAsDataURL(file);
               });
               setVideoPath(input);
          } else if (input) {
               setVideoPath(input);
          }
     };
     const handleSubmit = (e) => {
          e.preventDefault();

          if (!price) {
               toast.error('Veuillez entrer le prix de la annonce');
               return;
          }
          if (price < 0) {
               toast.error('Veuillez entrer un prix positif');
               return;
          }

          /* if (!videoPath) {
               toast.error(
                    "Veuillez télécharger une video ou fournir l'URL de l'video"
               );

               return;
          }
          */

          // If all validations pass, save the beverage
          handleSave();
          toast.success('Modifié avec success');
     };

     return (
          <>
               <button
                    className='self-center px-2 py-2 text-dark-grey '
                    type='button'
                    onClick={() => setShowModal(true)}>
                    <Image
                         className='text-dark-grey'
                         src='/icons/darkeditIcon.svg'
                         width={26}
                         height={26}
                    />
               </button>
               {showModal ? (
                    <>
                         <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal'>
                              <div className='relative w-auto max-w-3xl mx-auto my-6'>
                                   {/*content*/}
                                   <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[600px] w-[600px] overflow-scroll'>
                                        {/*header*/}
                                        <div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200'>
                                             <h3 className='text-3xl font-semibold'>
                                                  Modifier L&apos;annonce
                                             </h3>
                                             <button
                                                  className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none'
                                                  onClick={() =>
                                                       setShowModal(false)
                                                  }>
                                                  <span className='block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none'>
                                                       ×
                                                  </span>
                                             </button>
                                        </div>
                                        {/*body*/}
                                        <div className='relative flex-auto p-6'>
                                             <form>
                                                  <div className='mb-4'>
                                                       <label
                                                            className='block mb-2 font-bold text-gray-700'
                                                            htmlFor='name'>
                                                            Nom de la annonce
                                                       </label>
                                                       <input
                                                            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                                                            id='name'
                                                            type='text'
                                                            placeholder='Entrez le nom de la annonce'
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
                                                            className='block font-bold text-gray-700 '
                                                            htmlFor='name'>
                                                            Duree d’affichage
                                                       </label>

                                                       <div className='flex items-center'>
                                                            <div className='flex ml-2'>
                                                                 <div className='mr-2'>
                                                                      <input
                                                                           type='radio'
                                                                           name='unite'
                                                                           id='jours'
                                                                           value='jours'
                                                                           className='mr-1 appearance-none'
                                                                           onClick={
                                                                                handleUniteChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='jours'
                                                                           className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                unite ===
                                                                                'jours'
                                                                                     ? ' bg-slate-800 text-slate-50'
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
                                                                           className='mr-1 appearance-none'
                                                                      />
                                                                      <label
                                                                           htmlFor='semaines'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
                                                                                unite ===
                                                                                'semaines'
                                                                                     ? ' bg-slate-800 text-slate-50'
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
                                                                           className='mr-1 appearance-none'
                                                                           onClick={
                                                                                handleUniteChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='mois'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                unite ===
                                                                                'mois'
                                                                                     ? ' bg-slate-800 text-slate-50'
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
                                                            className='block font-bold text-gray-700 '
                                                            htmlFor='name'>
                                                            sexe cible
                                                       </label>

                                                       <div className='flex items-center'>
                                                            <div className='flex ml-2'>
                                                                 <div className='mr-2'>
                                                                      <input
                                                                           type='radio'
                                                                           name='sexe'
                                                                           id='M'
                                                                           value='M'
                                                                           className='mr-1 appearance-none'
                                                                           onClick={
                                                                                handleSexeChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='M'
                                                                           className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                sexe ===
                                                                                'M'
                                                                                     ? ' bg-slate-800 text-slate-50'
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
                                                                           className='mr-1 appearance-none'
                                                                      />
                                                                      <label
                                                                           htmlFor='F'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
                                                                                sexe ===
                                                                                'F'
                                                                                     ? ' bg-slate-800 text-slate-50'
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
                                                                           className='mr-1 appearance-none'
                                                                           onClick={
                                                                                handleSexeChange
                                                                           }
                                                                      />
                                                                      <label
                                                                           htmlFor='B'
                                                                           className={`flex items-center px-2 py-1  rounded-lg bg-gray-100 border border-gray-300 rounded-l cursor-pointer ${
                                                                                sexe ===
                                                                                'B'
                                                                                     ? ' bg-slate-800 text-slate-50'
                                                                                     : ''
                                                                           }`}>
                                                                           Les
                                                                           deux
                                                                      </label>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className='flex items-center justify-start my-8 '>
                                                       <div className='mr-8 font-bold text-gray-700'>
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
                                                            className='block mb-2 font-bold text-gray-700'
                                                            htmlFor='price'>
                                                            Prix
                                                       </label>
                                                       <input
                                                            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
                                                            id='price'
                                                            type='number'
                                                            placeholder='Entrez le prix de la annonce'
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
                                                            className='block mb-2 font-bold text-gray-700'
                                                            htmlFor='picture'>
                                                            Video
                                                       </label>

                                                       <div className='flex items-center justify-between gap-8 '>
                                                            {videoPath ? (
                                                                 <video
                                                                      controls
                                                                      poster='/path/to/poster.jpg'
                                                                      height={
                                                                           300
                                                                      }
                                                                      width={
                                                                           300
                                                                      }
                                                                      loading='lazy'>
                                                                      <source
                                                                           src={`/adsVideos/${videoPath}`}
                                                                           type='video/mp4'
                                                                      />
                                                                 </video>
                                                            ) : (
                                                                 <div className='w-48 h-48 bg-gray-200 rounded' />
                                                            )}
                                                            <input
                                                                 id='image'
                                                                 type='file'
                                                                 onChange={
                                                                      handleVideoChange
                                                                 }
                                                                 className='mt-2'
                                                            />
                                                       </div>
                                                  </div>
                                             </form>
                                        </div>

                                        <div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200'>
                                             <button
                                                  className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
                                                  type='button'
                                                  onClick={handleSubmit}>
                                                  Sauvegarder
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
                    </>
               ) : null}
          </>
     );
}
