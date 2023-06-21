import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { async } from "regenerator-runtime";
import { API_URL } from "../../config/api";

export default function AddClientDistModal({
  selectedClient,
  setSelectedClient,
  fetchClients,
}) {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.classList.contains("modal")) {
        setSelectedClient(null);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [numero_serie_distributeur, setnumero_serie_distributeur] =
    React.useState("");
  const addClientNewDist = async (
    selectedClient,
    numero_serie_distributeur
  ) => {
    try {
      console.log(selectedClient);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        API_URL + `/distributeurs/${numero_serie_distributeur}/client`,
        {
          id_client: selectedClient.id_client,
        },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    await addClientNewDist(selectedClient, numero_serie_distributeur);
    // Reset the form
    setnumero_serie_distributeur("");
  };

  const handleSubmit = async (e) => {
    if (!numero_serie_distributeur) {
      toast.error("Veuillez ajouter le numero serie");
      return;
    }
    // If all validations pass, save the beverage
    await handleSave();
    //await  fetchClients()
    toast.success("Ajouté avec success");
    fetchClients();
    setSelectedClient(null);
  };

  return (
    <>
      {selectedClient && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none  h-[400px] w-[400px] overflow-hidden">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">
                    Ajouter un distributeur au client{" "}
                  </h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="name"
                      >
                        numero serie de distributeur
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="numero_serie_distributeur"
                        type="text"
                        placeholder="Entrez le numero_serie_distributeur"
                        onChange={(e) =>
                          setnumero_serie_distributeur(e.target.value)
                        }
                      />
                    </div>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Ajouter
                    </button>
                  </div>
                  {showModal ? (
                    <>
                      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal">
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none  h-[400px] w-[400px] overflow-hidden">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                              <h3 className="text-3xl font-semibold">
                                Ajouter un distributeur au client{" "}
                              </h3>
                              <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}

                            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200"></div>
                          </div>
                        </div>
                      </div>
                      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
