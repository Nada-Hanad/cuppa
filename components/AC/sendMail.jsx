// // import React, { useEffect } from 'react';
// // import Image from 'next/image';
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import axios from 'axios';
// // import { API_URL } from '../../config/api';

// // import {  useState, useMemo } from 'react';
// // export default function Send({
// // 	idReclamations,
// // 	fetchReclamations,
// //     data,

	
// // }) {
	
// // 	const [message, setmessage] = useState('');
	
// // 	const [showModal, setShowModal] = React.useState(false);

// // 	useEffect(() => {
// // 		function handleClickOutside(event) {
// // 			if (event.target.classList.contains('modal')) {
// // 				setShowModal(false);
// // 			}
// // 		}

// // 		window.addEventListener('click', handleClickOutside);
// // 		return () => {
// // 			window.removeEventListener('click', handleClickOutside);
// // 		};
// // 	}, []);

// // 	const handleSave = async () => {
		
// // 		const token = localStorage.getItem('token');

// // 		const config = {
// // 			headers: { Authorization: `Bearer ${token}` },
// // 		};

// // 		try {
// // 			const res = await axios.post(
// // 				`${API_URL}/reclamation/reclamations/${idReclamations}`,
			
// // 			data,config

			
// // 			);
// // 		} catch (err) {
// // 			console.error(err);
// // 		}
// // 		fetchReclamations(),
// // 		setShowModal(false);
// // 	};

// // 	const handleSubmit = (e) => {
// // 		e.preventDefault();

	
// // 		handleSave();
// // 		toast.success('valideé avec success');
// // 	};
// // 	const handleSendMessage = () => {
// // 		// Logique pour envoyer le message
// // 	  };

// // 	return (
// // 		<>
// // 			<button
				
// // 				className={'w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-center bg-[#343A49] text-white'}
			  
			  
// // 							  onClick={() => setShowModal(true)}>
// // 							Envoyer email
// // 						  </button>

			
// // 			{showModal ? (
// // 				<>
					
// // 					<div className="flex justify-end space-x-5">
// // 					<textarea
// //   value={message}
// //   onChange={(e) => setmessage(e.target.value)}
// //   placeholder="Saisissez votre message..."
// //   rows={4}
// //   cols={50}
// // />

// //           <button onClick={handleSendMessage}>Envoyer</button>
// //         </div>
// // 				</>
// // 			) : null}
// // 		</>
// // 	);
// // }
// import React, { useEffect } from 'react';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { API_URL } from '../../config/api';

// import { useState } from 'react';

// export default function Send({
//   idReclamations,
//   fetchReclamations,
//   data,
// }) {
//   const [message, setmessage] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const handleSave = async () => {
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     try {
//       const res = await axios.post(
//         `${API_URL}/reclamation/reclamations/${idReclamations}`,
//         data,
//         config
//       );
//     } catch (err) {
//       console.error(err);
//     }
//     fetchReclamations();
//     setShowModal(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSave();
//     toast.success('Validé avec succès');
//   };

//   const handleSendMessage = () => {
//     // Logique pour envoyer le message
//   };

//   return (
//     <>
//       <button
//         className={'w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-center bg-[#343A49] text-white'}
//         onClick={() => setShowModal(true)}
//       >
//         Envoyer email
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-8">
//             <h3 className="text-3xl font-semibold mb-4">Envoyer un email</h3>
//             <textarea
//               value={message}
//               onChange={(e) => setmessage(e.target.value)}
//               placeholder="Saisissez votre message..."
//               rows={4}
//               cols={50}
//               className="border p-2 mb-4"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Envoyer
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg ml-4"
//               >
//                 Annuler
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/api';

export default function Send({ idReclamations, fetchReclamations, data }) {
  
  
  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.post(
        `${API_URL}/reclamation/reclamations/${idReclamations}`,
        data,
        config,
		console.log(data)
      );console.log('*************hey********************************')
	  console.log(res)
	  console.log(data)
	  console.log('****************hooo******************************')
    } catch (err) {
      console.error(err);
	  
    }
    fetchReclamations();
    setShowModal(false);
  };
  console.log('****************dta pour mail*******************************************');
  console.log(data);
  const [message, setMessage] = useState(data.description);
  const [initialMessage, setInitialMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
    // Ajoutez ici le code pour afficher une notification de succès
  };

  

  const openModal = () => {
    setInitialMessage(message); // Mettre à jour le message initial avec la valeur actuelle du message
    setShowModal(true);
  };

  const closeModal = () => {
    setMessage(initialMessage); // Rétablir le message initial si l'utilisateur annule
    setShowModal(false);
  };

  return (
    <>
      <button
        className="w-[180px] h-[60px] rounded-[15px] border-[3px] border-[#343A49] text-[#343A49] font-semibold text-[20px] flex items-center justify-center bg-[#343A49] text-white"
        onClick={openModal}
      >
        Envoyer email
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-3xl font-semibold mb-4">Envoyer un email</h3>
            <textarea
              value={message || initialMessage}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Saisissez votre message..."
              rows={4}
              cols={50}
              className="border p-2 mb-4"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Envoyer
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-lg ml-4"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
