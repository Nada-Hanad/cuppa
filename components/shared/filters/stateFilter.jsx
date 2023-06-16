import React, { useState } from "react";

const StateFilter = ({ onSelect, states }) => {
  const [selectedStates, setSelectedStates] = useState([]);

  const handleStateToggle = (state) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(
        selectedStates.filter((selected) => selected !== state)
      );
    } else {
      setSelectedStates([...selectedStates, state]);
    }
    onSelect(selectedStates); // Trigger the callback with the updated selected states
  };

  return (
    <div className="flex items-center space-x-4 my-4">
      {states.map((state) => (
        <button
          key={state.value}
          className={`px-4 py-2 rounded-full ${
            selectedStates.includes(state.value)
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => handleStateToggle(state.value)}
        >
          {state.label}
        </button>
      ))}
    </div>
  );
};

export default StateFilter;
