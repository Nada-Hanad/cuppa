import React from "react";

const FinancialStatements = ({ financialData }) => {
  const { balanceSheet, incomeStatement, cashFlowStatement } =
    financialData.financialStatements;

  // Function to determine color based on value
  const getColorCode = (value) => {
    if (value > 0) {
      return "text-green-600";
    } else if (value < 0) {
      return "text-red-600";
    } else {
      return "text-yellow-600";
    }
  };

  const MiniCard = ({ title, children }) => (
    <div className="bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 h-full">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      {children}
    </div>
  );

  const ValueCard = ({ label, value }) => (
    <li className="p-2 rounded shadow flex flex-row-reverse justify-between my-4">
      <span className={getColorCode(value)}>{value} DA</span>
      <p className="text-black">{label}</p>
    </li>
  );

  return (
    <div className="financial-statements">
      <h3 className="text-xl font-bold my-8">États financiers</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MiniCard title="Bilan">
            <div className="sub-card">
              <h5 className="text-md font-semibold">Actif</h5>
              <ul>
                <ValueCard label="Caisse" value={balanceSheet.assets.cash} />
                <ValueCard
                  label="Comptes clients"
                  value={balanceSheet.assets.accountsReceivable}
                />
                <ValueCard
                  label="Stocks"
                  value={balanceSheet.assets.inventory}
                />
              </ul>
            </div>
            <div className="sub-card">
              <h5 className="text-md font-semibold">Passif</h5>
              <ul>
                <ValueCard
                  label="Dettes fournisseurs"
                  value={balanceSheet.liabilities.accountsPayable}
                />
                <ValueCard
                  label="Dettes emprunts"
                  value={balanceSheet.liabilities.loansPayable}
                />
                <ValueCard label="Capital propre" value={balanceSheet.equity} />
              </ul>
            </div>
          </MiniCard>
        </div>

        <div>
          <MiniCard title="Compte de résultat">
            <div className="sub-card">
              <h5 className="text-md font-semibold">Revenus</h5>
              <ul>
                <ValueCard
                  label="Ventes"
                  value={incomeStatement.revenue.sales}
                />
                <ValueCard
                  label="Autres revenus"
                  value={incomeStatement.revenue.otherIncome}
                />
              </ul>
            </div>
            <div className="sub-card">
              <h5 className="text-md font-semibold">Dépenses</h5>
              <ul>
                <ValueCard
                  label="Coût des marchandises vendues"
                  value={incomeStatement.expenses.costOfGoodsSold}
                />
                <ValueCard
                  label="Dépenses opérationnelles"
                  value={incomeStatement.expenses.operatingExpenses}
                />
                <ValueCard
                  label="Charges d'intérêts"
                  value={incomeStatement.expenses.interestExpense}
                />
              </ul>
            </div>
            <p className={getColorCode(incomeStatement.netIncome)}>
              Bénéfices: {incomeStatement.netIncome} DA
            </p>
          </MiniCard>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatements;
