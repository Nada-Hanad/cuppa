import React, { useEffect, useState } from "react";
import AddIngredients from "./addIngredients";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DEPLOY_URL } from "../../../config/api";
import axios from "axios";
import { CircularProgress } from "@mui/material";

/**
 * Modal component for adding a beverage.
 * @param {Object} props - Component props.
 * @param {Array} props.drinks - Array of drinks.
 * @param {Function} props.setDrinks - Function to set the array of drinks.
 * @returns {JSX.Element} Modal component.
 */
export default function AddBoissonModal({ drinks, setDrinks }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allIngredient, setAllIngredient] = useState([]);
  function getIngredients() {
    axios
      .get(DEPLOY_URL + "/boissons/ing")
      .then((res) => {
        console.log(res.data);
        setAllIngredient(res.data);
      })
      .catch((err) => {
        toast.error("Une erreur s'est produite!");
      })
      .finally(() => {});
  }
  useEffect(() => {
    getIngredients();
  }, []);
  const addBeverage = (beverage, drinks, setDrinks) => {
    setLoading(true);
    axios
      .post(DEPLOY_URL + "/boissons", beverage)
      .then((res) => {
        // Add the new beverage to the drinks array
        const newDrinks = [...drinks, res.data];
        setDrinks(newDrinks);
        // Show a success message
        toast.success("Boisson ajoutée avec succès");
      })
      .catch((err) => {
        console.log(err);
        // Show an error message
        toast.error("Une erreur s'est produite lors de l'ajout de la boisson");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    /**
     * Handles click outside the modal to close it.
     * @param {Event} event - Click event.
     */
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

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [time, setTime] = useState("");
  const [des, setDes] = useState("");

  /**
   * Saves the beverage to the list of drinks and resets the form.
   */
  const handleSave = () => {
    const newDrinks = [
      ...drinks,
      {
        id: drinks.length + 1,
        name,
        price,
        image,
        ingredients,
      },
    ];
    setDrinks(newDrinks);

    // Reset the form
    setName("");
    setPrice("");
    setImage("");
    setTime("");
    setDes("");
    setIngredients([]);
    setShowModal(false);
  };

  /**
   * Handles the change of the beverage image.
   * @param {Event} e - Change event.
   */
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

  /**
   * Handles the form submission.
   * @param {Event} e - Form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (ingredients.length === 0) {
      toast.error("Veuillez ajouter au moins un ingrédient");
      return;
    }

    if (!price) {
      toast.error("Veuillez entrer le prix de la boisson");
      return;
    }
    if (price < 0) {
      toast.error("Veuillez entrer un prix positif");
      return;
    }

    if (!time) {
      toast.error("Veuillez remplir la durée de préparation");
      return;
    }
    if (!des) {
      toast.error("Veuillez remplir la description");
      return;
    }
    if (!image) {
      toast.error("Veuillez télécharger une image ou fournir l'URL de l'image");
      return;
    }

    // If all validations pass, save the beverage
    const beverage = {
      duree_preparation_boisson: time,
      libelle_boisson: name,
      description_boisson: des,
      prix_boisson: parseFloat(price),
      id_client: 1,
      path_image_boisson: image,
      ingredients: ingredients,
    };
    addBeverage(beverage, drinks, setDrinks);
  };
  return (
    <>
      <button
        className="self-end px-8 py-3 mr-12 text-white bg-dark-grey rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ajouter
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal scrollbar scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[600px] w-[600px] overflow-scroll">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold text-dark-grey">
                    Ajouter un boisson
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
                  <form>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Nom de la boisson
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Entrez le nom de la boisson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <AddIngredients
                      setIngredients={setIngredients}
                      ingredients={ingredients}
                      availableIngredients={allIngredient}
                    />
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="price"
                      >
                        Prix
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Entrez le prix de la boisson"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="time"
                      >
                        Durée de préparation
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="time"
                        type="text"
                        placeholder="Entrez la durée de préparation du boisson"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="time"
                      >
                        Description
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="time"
                        type="text"
                        placeholder="Entrez la description du boisson"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        htmlFor="picture"
                      >
                        Image
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="picture"
                        type="text"
                        placeholder="Entrez l'URL de l'image de la boisson"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <p className="p-4">Ou bien</p>
                      <div className="flex items-center justify-between gap-8 ">
                        {image ? (
                          <Image
                            src={image}
                            alt="Boisson"
                            className="object-cover w-full h-48 rounded"
                            height={300}
                            width={300}
                          />
                        ) : (
                          <div className="w-48 h-48 bg-gray-200 rounded" />
                        )}
                        <input
                          id="image"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleImageChange}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none"
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
