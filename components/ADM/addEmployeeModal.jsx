import React, { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../config/api";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
export default function AddAdvertiserModal({ drinks, fetchAdvertisers }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [role, setRole] = React.useState("");
  const [sexe, setSexe] = React.useState("");
  const handleRoleChange = (e) => {
    e.preventDefault();
    setRole(e.target.value);
  };

  const handleSexeChange = (e) => {
    e.preventDefault();
    setSexe(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        `${API_URL}/api/account.management/createAccount/AM`,
        {
          username_utilisateur: username,
          password_utilisateur: password,
          nom_utilisateur: lastName,
          prenom_utilisateur: firstName,
          sexe_utilisateur: sexe,
          id_role: Number(role),
        },
        config
      );
      toast.success("Ajouté avec success");
    } catch (err) {
      toast.error("Une erreure d'est produite");
      console.error(err);
    }

    // Reset the form
    setUsername("");
    setRole("");

    setShowModal(false);
    fetchAdvertisers();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      toast.error("Veuillez entrer le nom de l'employés");
      return;
    }
    if (!lastName) {
      toast.error("Veuillez entrer le prenom de l'employés");
      return;
    }
    if (!sexe) {
      toast.error("Veuillez entrer le prenom de l'employés");
      return;
    }
    if (!username) {
      toast.error("Veuillez entrer le nom de l'employés");
      return;
    }
    if (!password) {
      toast.error("Veuillez entrer le password de l'employés");
      return;
    }
    if (!role) {
      toast.error("Veuillez entrer le type de l' employés");
      return;
    }

    // If all validations pass, save the beverage
    handleSave();
  };

  return (
    <>
      <button
        className="self-end px-4 py-4 mr-12 text-white bg-dark-grey rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ajouter
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none over overflow-y-scroll 
                                        scrollbar  scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack
                                        h-[600px] lg:w-[600px] "
              >
                {/*header*/}
                <div className="flex items-start justify-center p-5 mx-auto border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold text-dark-grey">
                    Ajouter employé
                  </h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="z-10 block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <form>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-left text-gray-700"
                        htmlFor="Name"
                      >
                        Nom de l&apos; employé
                      </label>
                      <input
                        name="Name"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="fname"
                        type="text"
                        placeholder="Entrez le nom de la employés"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-left text-gray-700"
                        htmlFor="Name"
                      >
                        Prenom de l&apos; employé
                      </label>
                      <input
                        name="Name"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="lname"
                        type="text"
                        placeholder="Entrez le nom de la employés"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="flex mb-4">
                      <label
                        className="block ml-2 mr-8 mt-[28px] font-bold text-left text-gray-700 "
                        htmlFor="name"
                      >
                        Sexe
                      </label>
                      <div>
                        <div className="flex items-center justify-start">
                          <div className="flex ml-2">
                            <div className="mr-2">
                              <input
                                type="radio"
                                name="sexe"
                                id="M"
                                value="M"
                                className="mr-1 appearance-none "
                                onClick={handleSexeChange}
                              />
                              <label
                                htmlFor="M"
                                className={`flex items-center px-5 py-1 rounded-xl border border-gray-300  cursor-pointer ${
                                  sexe === "M"
                                    ? " bg-slate-800 text-slate-50"
                                    : " bg-gray-50 text-gray-500"
                                }`}
                              >
                                Homme
                              </label>
                            </div>
                            <div className="mr-2">
                              <input
                                type="radio"
                                name="sexe"
                                id="F"
                                value="F"
                                onClick={handleSexeChange}
                                className="mr-1 appearance-none"
                              />
                              <label
                                htmlFor="F"
                                className={`flex items-center px-5 py-1 rounded-xl bg-gray-200 border border-gray-300  cursor-pointer ${
                                  sexe === "F"
                                    ? " bg-slate-800 text-slate-50"
                                    : " bg-gray-50 text-gray-500"
                                }`}
                              >
                                Femme
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-start mb-4 gap-x-12">
                      <label
                        className="block mt-4 font-bold text-gray-700 "
                        htmlFor="name"
                      >
                        Role
                      </label>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center ml-2 ">
                          <div className="mr-2">
                            <input
                              type="radio"
                              name="role"
                              id="AM"
                              value="5"
                              className="mr-1 appearance-none"
                              onClick={handleRoleChange}
                            />
                            <label
                              htmlFor="AM"
                              className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300  cursor-pointer ${
                                role === "5"
                                  ? " bg-slate-800 text-slate-50"
                                  : " bg-gray-50 text-gray-500"
                              }`}
                            >
                              AM
                            </label>
                          </div>
                          <div className="mr-2">
                            <input
                              type="radio"
                              name="role"
                              id="AC"
                              value="4"
                              onClick={handleRoleChange}
                              className="mr-1 appearance-none"
                            />
                            <label
                              htmlFor="AC"
                              className={`flex items-center  px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
                                role === "4"
                                  ? " bg-slate-800 text-slate-50"
                                  : " bg-gray-50 text-gray-500"
                              }`}
                            >
                              AC
                            </label>
                          </div>
                          <div className="mr-2">
                            <input
                              type="radio"
                              name="role"
                              id="Decideur"
                              value="6"
                              onClick={handleRoleChange}
                              className="mr-1 appearance-none"
                            />
                            <label
                              htmlFor="Decideur"
                              className={`flex items-center  px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
                                role === "6"
                                  ? " bg-slate-800 text-slate-50"
                                  : " bg-gray-50 text-gray-500"
                              }`}
                            >
                              Décideur
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-left text-gray-700"
                        htmlFor="Name"
                      >
                        Nom de l&apos; utilisateur
                      </label>
                      <input
                        name="usersame"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Entrez le nom de l' utilsateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-left text-gray-700"
                        htmlFor="Name"
                      >
                        Mot de passe
                      </label>
                      <input
                        name="usersame"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="password2"
                        type="password"
                        placeholder="Entrez le nom de l' utilsateur"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Sauvegarder
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
