import Image from 'next/image';
import EditBoissonModal from './editPubModal';
import DeleteAnnonceModal from './deletePubModal';

export default function BoissonCard({ drink, drinks, setDrinks }) {
     return (
          <div className='h-[250px] rounded-xl bg-white p-[10px] text-start flex flex-col justify-between shadow-lg'>
               <div className='flex flex-col items-center justify-between gap-4'>
                    <video
                         className='object-cover w-10/12 rounded-lg shadow-md'
                         controls
                         //    autoplay
                         //    muted
                         // poster='/path/to/poster.jpg'
                         width='full'
                         height='120'
                         loading='lazy'>
                         <source
                              src={`/adsVideos/${drink.videoPath}`}
                              type='video/mp4'
                         />
                    </video>

                    <div className='flex justify-between w-full '>
                         <h2 className='font-bold py-1 px-2 w-fit text-dark-grey text-[20px] rounded flex justify-center items-center'>
                              {drink?.name}
                         </h2>
                         <div className='flex justify-between gap-2 '>
                              <EditBoissonModal
                                   drinks={drinks}
                                   setDrinks={setDrinks}
                                   drink={drink}
                              />
                              <DeleteAnnonceModal
                                   drinks={drinks}
                                   setDrinks={setDrinks}
                                   drink={drink}
                              />
                         </div>
                    </div>
               </div>
          </div>
     );
}
