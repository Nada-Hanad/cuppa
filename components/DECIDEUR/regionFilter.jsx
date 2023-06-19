import React from "react";

const RegionFilter = ({ selectedRegion, onChange }) => {
  const regions = [
    "Region 1",
    "Region 2",
    "Region 3",
    "Region 4",
    "Region 5",
    "Region 6",
    "Region 7",
  ];

  return (
    <div>
      <label htmlFor="region-filter" className="mr-2">
        Filtre par région:
      </label>
      <select
        id="region-filter"
        value={selectedRegion}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Toutes les régions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;
