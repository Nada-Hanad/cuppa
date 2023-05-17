import React, { useEffect, useState } from 'react';

/**
 * Component for adding ingredients to a list.
 * @param {function} setIngredients - Function to update the list of ingredients.
 * @param {Array} ingredients - List of ingredients.
 * @returns {JSX.Element} - Ingredient input and list component.
 */
export default function AddIngredients({ setIngredients, ingredients }) {
	const [ingredient, setIngredient] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [error, setError] = useState('');

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
		if (ingredient.trim() !== '') {
			if (ingredients.find((ing) => ing.name === ingredient.trim())) {
				setError('Cet ingrédient a déjà été ajouté.');
			} else {
				setIngredients((ingredients) => [
					...ingredients,
					{ name: ingredient.trim(), quantity },
				]);
				setIngredient('');
				setQuantity(1);
				setError('');
			}
		}
	};

	/**
	 * Handler for removing an ingredient from the list.
	 * @param {number} index - Index of the ingredient to remove.
	 */
	const handleRemoveIngredient = (index) => {
		setIngredients((ingredients) =>
			ingredients.filter((_, i) => i !== index)
		);
	};

	/**
	 * Handler for submitting the ingredient modal form.
	 * @param {Event} e - Form submit event.
	 */
	const handleModalSubmit = (e) => {
		e.preventDefault();
		if (ingredients.length > 0) {
			setIngredients((ingredients) => [...ingredients]);
			setIngredient('');
			setQuantity(1);
			setError('');
		}
	};

	/**
	 * Handler for submitting the ingredient form.
	 * @param {Event} e - Form submit event.
	 */
	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (ingredient.trim() === '') {
			setError('Veuillez entrer un ingrédient.');
			return;
		}
		if (ingredients.find((ing) => ing.name === ingredient.trim())) {
			setError('Cet ingrédient a déjà été ajouté.');
			return;
		}
		setIngredients((ingredients) => [
			...ingredients,
			{ name: ingredient.trim(), quantity },
		]);
		setIngredient('');
		setQuantity(1);
		setError('');
	};

	return (
		<div>
			<label
				htmlFor='ingredients'
				className='block text-lg font-bold mb-2 text-dark-grey'>
				Ingrédients
			</label>
			<div className='flex items-center mb-4'>
				<select
					value={ingredient}
					onChange={handleInputChange}
					className='w-full rounded-l-lg h-12 border-t  mr-0 border-b border-l text-gray-800 border-gray-200 bg-white'>
					<option value='' disabled>
						Sélectionner un ingrédient
					</option>
					<option value='Ingredient 1'>Ingredient 1</option>
					<option value='Ingredient 2'>Ingredient 2</option>
					<option value='Ingredient 3'>Ingredient 3</option>
				</select>
				<input
					type='number'
					value={quantity}
					onChange={handleQuantityChange} // added quantity input
					min='20'
					max='300'
					className='h-12 border-t border-b border-r text-gray-800 border-gray-200 bg-white'
				/>
				<div
					onClick={handleAddIngredient}
					className='px-8 h-12 rounded-r-lg bg-dark-grey text-white font-bold flex items-center  uppercase cursor-pointer'>
					Ajouter
				</div>
			</div>
			{ingredients.length > 0 && (
				<div className='mt-2 overflow-y-scroll'>
					<ul className=''>
						{ingredients.map((ing, index) => (
							<li
								key={index}
								className='flex items-center justify-between text-gray-700 mb-2'>
								<span>{ing.name}</span>
								<span>{ing.quantity}</span>
								<div
									onClick={() =>
										handleRemoveIngredient(index)
									}
									className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer'>
									Supprimer
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
			{error && <p className='text-red-500 mt-2'>{error}</p>}
		</div>
	);
}
