import React from "react";

const FinancialOverview = ({ financialData }) => {
  const { revenue, expenses, profits } = financialData.financialOverview;
  const currency = "DA";

  return (
    <div className="financial-overview">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 font-semibold">Revenus</p>
          <p className="text-2xl font-bold">
            {revenue} {currency}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 font-semibold">Dépenses</p>
          <p className="text-2xl font-bold">
            {expenses} {currency}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-600 font-semibold">Bénéfices</p>
          <p className="text-2xl font-bold">
            {profits} {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
