import React, { useState } from "react";

export default function AddIngredients({ setIngredients, ingredients }) {
  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      if (ingredients.includes(ingredient.trim())) {
        setError("Cet ingrédient a déjà été ajouté.");
      } else {
        setIngredients((ingredients) => [...ingredients, ingredient.trim()]);
        setIngredient("");
        setError("");
      }
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((ingredients) => ingredients.filter((_, i) => i !== index));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      setIngredients((ingredients) => [...ingredients]);
      setIngredient("");
      setError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim() === "") {
      setError("Veuillez entrer un ingrédient.");
      return;
    }
    if (ingredients.includes(ingredient.trim())) {
      setError("Cet ingrédient a déjà été ajouté.");
      return;
    }
    setIngredients((ingredients) => [...ingredients, ingredient.trim()]);
    setIngredient("");
    setError("");
  };

  return (
    <div>
      <label htmlFor="ingredients" className="block text-lg font-medium mb-2">
        Ingrédients
      </label>
      <form onSubmit={handleFormSubmit} className="flex items-center mb-4">
        <select
          value={ingredient}
          onChange={handleInputChange}
          className="w-full rounded-l-lg p-3 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        >
          <option value="" disabled>
            Sélectionner un ingrédient
          </option>
          <option value="Ingredient 1">Ingredient 1</option>
          <option value="Ingredient 2">Ingredient 2</option>
          <option value="Ingredient 3">Ingredient 3</option>
        </select>
        <div
          onClick={handleAddIngredient}
          className="px-8 rounded-r-lg bg-dark-grey text-white font-bold p-3 uppercase cursor-pointer"
        >
          Ajouter
        </div>
      </form>
      {ingredients.length > 0 && (
        <div className="mt-2 overflow-y-scroll">
          <ul className="">
            {ingredients.map((ing, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-700 mb-2"
              >
                <span>{ing}</span>
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
