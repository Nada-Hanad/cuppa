import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import Head from "next/head";
import Title from "../../components/shared/layout/title";
import Image from "next/image";

const InfoLine = ({ title, value }) => {
  return (
    <div className="flex items-center justify-start w-full pb-4 font-bold text-dark-grey ">
      <label className="relative flex w-2/3 ">{title} :</label>
      <p>{value}</p>
    </div>
  );
};

export default function Profil() {
  const [profil, setProfile] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {};
    if (username  && password ) {
       data = {
        username_utilisateur: username,
        password_utilisateur: password,
      };
    } else if (username) {
        data = {
          username_utilisateur: username,
        };
    } else if (password) {
        data = {  
          password_utilisateur: password,
        };

    }
    
 
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .put(
        `${API_URL}/api/account.management/modifyAccount/${profil?.role?.libelle_role}/${profil?.id_utilisateur}`,
        data ,config
      )
      .catch((e) => console.log(e));
    if (response) {
     
      localStorage.setItem("token", token);
      setIsLoading(false);
      fetchProfile();
    }
  };
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(`${API_URL}/api/account.management/getProfileWithClient/`, config)
      .catch((e) => console.log(e));
    if (response) {
      const profil = response.data;
      console.log(profil.data);
      setProfile(profil.data);
      setUsername(profil.data.username_utilisateur);
      //setPassword(profil.data.password_utilisateur);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-8 text-center">
        <Head>
          <title>Profil</title>
        </Head>
        <Title title="Profil" />
      </div>
      <div className="flex flex-col items-center justify-center md:flex-row gap-x-20 ">
        <div className="flex flex-col items-start justify-start px-8 pt-8 mx-auto mt-8 mb-24 text-center shadow-lg bg-slate-50 sm:w-full md:2/3 lg:w-1/3 min-h-96 ">
          <div className="w-full mb-12">
            <img
              alt="profile"
              height={48}
              width={48}
              className="object-cover w-48 h-48 mx-auto rounded "
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            />
          </div>

          <InfoLine
            title="Nom d 'utilisateur   "
            value={profil?.username_utilisateur}
          />
          <InfoLine title="Role   " value={profil?.role?.libelle_role} />
          <InfoLine title="Nom   " value={profil?.profil?.nom_utilisateur} />
          <InfoLine
            title="Prénom   "
            value={profil?.profil?.prenom_utilisateur}
          />
          <InfoLine
            title="Sexe   "
            value={
              profil?.profil?.sexe_utilisateur == "M"
                ? "Homme"
                : profil?.profil?.sexe_utilisateur == "F"
                ? "Femme"
                : ""
            }
          />
          <InfoLine title="Client" value={profil?.client?.nom_client} />
          <InfoLine
            title="Superviseur  "
            value={profil?.supervisor?.profil?.nom_utilisateur}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-4/12">
          <button
            onClick={() => setOpenEdit(!openEdit)}
            className="self-end px-4 py-4 mx-auto mb-8 text-white rounded bg-dark-grey"
          >
            {" "}
            Modifier Profil
          </button>
          {openEdit && (
            <form className="flex flex-col px-12">
              <label className="my-1 font-normal text-dark-gray ">
                Nom d&apos;utilisateur
              </label>
              <input
                type="text "
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={`px-4 py-2 border-2  rounded  ${
                  error ? " border-red-500 " : " border-dark-grey "
                }  `}
              />
              <label className="my-1 font-normal text-dark-gray ">
                Mot de passe
              </label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className={`px-4 py-2 border-2  rounded 	${
                  error ? " border-red-500 " : " border-dark-grey "
                }	`}
              />

              <div className="w-64">
                {error && <p className="w-2/3 text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                className="my-2 w-full h-10 bg-[#F18C4F] rounded-lg font-bold cursor-pointer "
                onClick={handleSubmit}
                disabled={isLoading} // Disable button during loading
              >
                {isLoading ? "Loading..." : "sauvgarder"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
