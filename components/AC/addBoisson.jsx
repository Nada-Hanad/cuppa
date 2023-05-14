import React, { useEffect } from "react";
import AddIngredients from "./addIngredients";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBoissonModal({ drinks, setDrinks }) {
  const [showModal, setShowModal] = React.useState(false);
  const availableIngredients = ["Ingredient 1", "Ingredient 2", "Ingredient 3"];

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
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);

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
    setIngredients([]);
    setShowModal(false);
  };
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

    if (!image) {
      toast.error("Veuillez télécharger une image ou fournir l'URL de l'image");
      return;
    }

    if (!ingredients.length) {
      toast.error("Veuillez ajouter au moins un ingrédient");
      return;
    }
    // If all validations pass, save the beverage
    handleSave();
    toast.success("Ajouté avec success");
  };

  return (
    <>
      <button
        className="px-4 py-4 bg-dark-grey rounded-xl text-white self-end mr-12"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ajouter
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[600px] w-[600px] overflow-scroll">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Ajouter un boisson</h3>
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
                        Nom de la boisson
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      availableIngredients={availableIngredients}
                    />
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="price"
                      >
                        Prix
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Entrez le prix de la boisson"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="picture"
                      >
                        Image
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="picture"
                        type="text"
                        placeholder="Entrez l'URL de l'image de la boisson"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <p className="p-4">Ou bien</p>
                      <div className="flex justify-between items-center gap-8 ">
                        {image ? (
                          <Image
                            src={image}
                            alt="Boisson"
                            className="h-48 w-full object-cover rounded"
                            height={300}
                            width={300}
                          />
                        ) : (
                          <div className="h-48 w-48 bg-gray-200 rounded" />
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

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-dark-grey text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Sauvegarder
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
