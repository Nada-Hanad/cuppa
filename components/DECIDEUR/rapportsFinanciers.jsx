import React from "react";
import FinancialStatements from "./financialStatements";
import CustomReports from "./customReports";

const RapportsFinanciers = ({ financialData }) => {
  return (
    <div className="my-8">
      <FinancialStatements financialData={financialData} />
    </div>
  );
};

export default RapportsFinanciers;
