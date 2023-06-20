import React, { useEffect, useState } from "react";

export default function AddIngredients({
  setIngredients,
  ingredients,
  availableIngredients,
}) {
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  /**
   * Handler for ingredient input change.
   * @param {Event} e - Input change event.
   */
  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  /**
   * Handler for quantity input change.
   * @param {Event} e - Input change event.
   */
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  /**
   * Handler for adding an ingredient to the list.
   */
  const handleAddIngredient = () => {
    // Check if the ingredient already exists
    const existingIngredient = ingredients.find(
      (ing) => ing.id_outil === ingredient
    );

    if (existingIngredient) {
      setError("L'ingrédient existe déjà");
      return;
    }

    const i = {
      id_outil: ingredient,
      quantite_preparation: quantity,
    };

    setIngredients([...ingredients, i]);
    setError("");
  };

  /**
   * Handler for removing an ingredient from the list.
   * @param {number} index - Index of the ingredient to remove.
   */
  const handleRemoveIngredient = (index) => {
    if (index > -1) {
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
  };

  /**
   * Handler for submitting the ingredient modal form.
   * @param {Event} e - Form submit event.
   */
  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
    }
  };

  /**
   * Handler for submitting the ingredient form.
   * @param {Event} e - Form submit event.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <label
        htmlFor="ingredients"
        className="block text-lg font-bold mb-2 text-dark-grey"
      >
        Ingrédients
      </label>
      <div className="flex items-center mb-4">
        <select
          value={ingredient}
          onChange={handleInputChange}
          className="w-full rounded-l-lg h-12 border-t  mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        >
          <option value="" disabled>
            Sélectionner un ingrédient
          </option>
          {availableIngredients.map((e) => {
            return (
              <option value={e.id_ingredient}>
                {e.libelle_ingredient.charAt(0).toUpperCase() +
                  e.libelle_ingredient.slice(1)}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange} // added quantity input
          min="20"
          max="300"
          className="h-12 border-t border-b border-r text-gray-800 border-gray-200 bg-white"
        />
        <div
          onClick={handleAddIngredient}
          className="px-8 h-12 rounded-r-lg bg-dark-grey text-white font-bold flex items-center  uppercase cursor-pointer"
        >
          Ajouter
        </div>
      </div>
      {ingredients.length > 0 && (
        <div className="mt-2 overflow-y-scroll">
          <ul className="">
            {ingredients.map((ing, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-700 mb-2"
              >
                <span>
                  {availableIngredients
                    .find((e) => e.id_ingredient == ing.id_outil)
                    .libelle_ingredient.charAt(0)
                    .toUpperCase() +
                    availableIngredients
                      .find((e) => e.id_ingredient == ing.id_outil)
                      .libelle_ingredient.slice(1)}
                </span>
                <span>{ing.quantite_preparation}</span>
                <div
                  onClick={() => handleRemoveIngredient(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Supprimer
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
