import Image from 'next/image';
import EditBoissonModal from './editPubModal';
import DeleteAnnonceModal from './deletePubModal';

export default function BoissonCard({ drink, drinks, setDrinks }) {
     return (
          <div className='h-[250px] rounded-xl bg-white p-[10px] text-start flex flex-col justify-between shadow-lg'>
               <div className='flex flex-col justify-between items-center gap-4'>
                    <video
                         className='object-cover rounded-lg shadow-md w-10/12'
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

                    <div className=' flex  gap-8'>
                         <h2 className='font-bold py-1 px-2 w-fit text-dark-grey text-[20px] rounded flex justify-center items-center'>
                              {drink?.name}
                         </h2>
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
     );
}
