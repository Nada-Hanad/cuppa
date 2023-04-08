import React, { useEffect, useState } from "react";

export default function AddIngredients({ setIngredients, ingredients }) {
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState(1); // added state for quantity
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleQuantityChange = (e) => {
    // added handler for quantity change
    setQuantity(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      if (ingredients.find((ing) => ing.name === ingredient.trim())) {
        // updated to use the ingredient object instead of the name
        setError("Cet ingrédient a déjà été ajouté.");
      } else {
        setIngredients((ingredients) => [
          ...ingredients,
          { name: ingredient.trim(), quantity },
        ]); // updated to include quantity
        setIngredient("");
        setQuantity(1); // reset quantity to 1 after adding ingredient
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
      setQuantity(1); // reset quantity to 1 after submitting form
      setError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim() === "") {
      setError("Veuillez entrer un ingrédient.");
      return;
    }
    if (ingredients.find((ing) => ing.name === ingredient.trim())) {
      // updated to use the ingredient object instead of the name
      setError("Cet ingrédient a déjà été ajouté.");
      return;
    }
    setIngredients((ingredients) => [
      ...ingredients,
      { name: ingredient.trim(), quantity },
    ]); // updated to include quantity
    setIngredient("");
    setQuantity(1); // reset quantity to 1 after adding ingredient
    setError("");
  };

  return (
    <div>
      <label htmlFor="ingredients" className="block text-lg font-medium mb-2">
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
          <option value="Ingredient 1">Ingredient 1</option>
          <option value="Ingredient 2">Ingredient 2</option>
          <option value="Ingredient 3">Ingredient 3</option>
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
                <span>{ing.name}</span>
                <span>{ing.quantity}</span>
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
