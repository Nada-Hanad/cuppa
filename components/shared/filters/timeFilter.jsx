import React from "react";

const ChartFilter = ({ selectedFilter, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="filter">Filter par:</label>
      <select
        id="filter"
        value={selectedFilter}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="week">Semaine</option>
        <option value="month">Mois</option>
        <option value="year">Année</option>
      </select>
    </div>
  );
};

export default ChartFilter;
