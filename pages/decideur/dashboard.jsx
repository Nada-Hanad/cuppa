import React, { useEffect, useState } from "react";
import ChartFilter from "../../components/shared/filters/timeFilter";
import Title from "../../components/shared/layout/title";
import Head from "next/head";
import BarChart from "../../components/shared/charts/barChart";
import DashboardCard from "../../components/DECIDEUR/dashboardCard";
import defaultData from "../../helpers/mocks/decideur.json";
import DistributorMonitoring from "../../components/DECIDEUR/distrobitorMonitoring";

export default function DeciderDashboard() {
  function getChartData(filter) {
    const initialData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: "Taux d'utilisation",
          borderColor: "rgb(109, 253, 181)",
          backgroundColor: "rgb(109, 253, 181,0.5)",
          borderWidth: 2,
        },
      ],
    };

    const distributorUtilizationData = defaultData.distributorUtilization;

    // Retrieve the region labels from the JSON file
    initialData.labels = defaultData.regions;

    // Calculate the sum of utilization for each region per week
    const regionUtilizationSum = initialData.labels.map((region) =>
      distributorUtilizationData[region][filter].utilization.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );

    // Set the dataset data as the sum of utilization per week
    initialData.datasets[0].data = regionUtilizationSum;

    return initialData;
  }

  const [data, setData] = useState(getChartData("week"));
  const [filter, setFilter] = useState("week");
  const [cardData, setCardData] = useState({
    successfulOrders: defaultData.consumerUsageStatistics.week.successfulOrders,
    failedOrders: defaultData.consumerUsageStatistics.week.failedOrders,
  });

  const handleFilterChange = (value) => {
    setFilter(value);

    if (value === "week") {
      setData(getChartData("week"));
      setCardData({
        successfulOrders:
          defaultData.consumerUsageStatistics.week.successfulOrders,
        failedOrders: defaultData.consumerUsageStatistics.week.failedOrders,
      });
    } else if (value === "month") {
      setData(getChartData("month"));
      setCardData({
        successfulOrders:
          defaultData.consumerUsageStatistics.month.successfulOrders,
        failedOrders: defaultData.consumerUsageStatistics.month.failedOrders,
      });
    } else if (value === "year") {
      setData(getChartData("year"));
      setCardData({
        successfulOrders:
          defaultData.consumerUsageStatistics.year.successfulOrders,
        failedOrders: defaultData.consumerUsageStatistics.year.failedOrders,
      });
    }
  };
  const distributorMonitoringData = defaultData.distributorMonitoring;

  return (
    <div className="text-center pt-8 flex flex-col items-center h-screen">
      <Head>
        <title>Tableau de bord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Tableau de bord" />
      <ChartFilter selectedFilter={filter} onChange={handleFilterChange} />
      <div className="w-full flex items-center h-3/4 justify-around">
        <div className="w-3/5">
          <BarChart chartData={data} />
        </div>
        <div className="flex flex-col gap-8">
          <DashboardCard
            header={"Commandes"}
            data={{
              Réussites: cardData.successfulOrders,
              Défaillantes: cardData.failedOrders,
            }}
          />
          <DashboardCard
            header={"Transactions"}
            data={{
              Valides:
                defaultData.paymentTransactionStatistics[filter].validPayments,
              Annulées:
                defaultData.paymentTransactionStatistics[filter]
                  .invalidPayments,
            }}
          />
          <DistributorMonitoring {...distributorMonitoringData} />
        </div>
      </div>
    </div>
  );
}
