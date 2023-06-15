import axios from 'axios';
import React, { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { async } from 'regenerator-runtime';
import { API_URL } from '../../config/api'

export default function AddDistModal({fetchDistributeurs}) {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.classList.contains("modal")) {
        setShowModal(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [numero_serie_distributeur, setnumero_serie_distributeur] = React.useState("");
 
  const insertNewDist = async (numero_serie_distributeur) => {
  try {
		const token = localStorage.getItem('token');
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

    const response = await axios.post(API_URL +'/distributeurs',  {
      numero_serie_distributeur: numero_serie_distributeur
    },config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
} 
  const handleSave = async() => {
  await insertNewDist(numero_serie_distributeur) 
    // Reset the form
    setnumero_serie_distributeur("");
};
 
   const handleSubmit = async(e) => {
    e.preventDefault();

    if (!numero_serie_distributeur) {
      toast.error("Veuillez ajouter le numero serie");
      return;
    }
    // If all validations pass, save the beverage
  await  handleSave();
  await  fetchDistributeurs()
    toast.success("Ajouté avec success");
    setShowModal(false);  
    };

  return (
    <>
        
    <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-[160px] h-[60px] rounded-[15px] bg-[#343A49] text-white text-[20px] flex items-center justify-evenly"
    >{/**  
      <Image src="/icons/plus.png" width={35} height={35}></Image>
    */}
     Ajouter distributeur    
    </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[400px] w-[600px] overflow-hidden">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Ajouter un distributeur</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                      >
                        numero serie de distributeur
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="numero_serie_distributeur"
                        type="text"
                        placeholder="Entrez le numero_serie_distributeur"
                        onChange={(e) => setnumero_serie_distributeur(e.target.value)}
                      />
                    </div>

                   </form>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-dark-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}