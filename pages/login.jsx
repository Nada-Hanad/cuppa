import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { DEPLOY_URL } from "../config/api";
import LoadingPage from "./loading";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [error, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading state to true
    if (!username) {
      setError("Entrez le username s'il vous plait");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Entrez le motepass s'il vous plait");
      setIsLoading(false);

      return;
    }

    console.log();
    try {
      const response = await axios.post(`${DEPLOY_URL}/login`, {
        username,
        password,
        rememberMe,
      });
      console.log(response);
      setIsLoadingPage(true);
      let token = response.data.token;
      let role = response.data.role;
      let name = response.data.name;
      // Store the token in local storage or cookies
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      // Redirect to another page
      console.log(`role`);
      //	console.log(response);
      if (role === "SADM") {
        router.push("/sadm/clients");
      } else if (role === "AC") {
        router.push("/ac/profil");
      } else if (role === "decideur") {
        router.push("/decideur/dashboard");
      } else if (role === "ADM") {
        router.push("/adm/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.status == 401) {
        setError(`Nom d'utilisateur ou mot de passe incorrect`);
      } else
        setError("Erreur de serveur interne, veuillez réessayer plus tard"); // Set error message
      setIsLoadingPage(false);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  return (
    <>
      {isLoadingPage ? (
        <LoadingPage />
      ) : (
        <div className="relative w-full h-screen">
          <img
            alt="bg"
            className="absolute w-full h-full -z-20 "
            src="/icons/loginBg.png"
          />
          <div className="absolute w-full h-full bg-black bg-opacity-70 -z-10 " />

          <div className="flex flex-col items-center justify-center w-full h-full gap-20 lg:flex-row ">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center">
                <img
                  alt="logo"
                  src="icons/whiteLogo.svg"
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 animate-roll-in"
                />
                <h2 className="font-bold tracking-widest mt-8 text-[40px]  md:text-[50px] lg:text-[70px] text-white">
                  CUPPA
                </h2>
              </div>
              <p className=" text-[22px] md:text-[28px] lg:text-[36px] text-white font-bold">
                Pouring Happiness Into Every Cup
              </p>
            </div>
            <div className="flex w-11/12 sm:w-6/12  md:w-5/12  lg:w-4/12 xl:w-3/12 bg-white rounded h-5/6  lg:h-2/3 justify-center items-center flex-col">
              <img alt="logo" src="icons/blackLogo.svg" className="w-20 h-24" />
              <h3 className="text-black my-4 font-bold text-[20px]">
                Bienvenue !
              </h3>
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
                <div className="flex items-center justify-start ">
                  <input
                    type="checkbox"
                    onClick={setRememberMe}
                    className="w-4 h-4 border-gray-300 rounded-sm form-checkbox text-emerald-700 focus:text-red-500 focus:border-red-800"
                  />
                  <label className="my-1 ml-3 font-normal text-dark-gray ">
                    Se Souvenir de moi
                  </label>
                </div>
                <div className="w-64">
                  {error && <p className="w-2/3 text-red-500">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="my-2 w-full h-10 bg-[#F18C4F] rounded font-bold cursor-pointer text-white "
                  onClick={handleSubmit}
                  disabled={isLoading} // Disable button during loading
                >
                  {isLoading ? "Loading..." : "Log in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
