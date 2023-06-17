import React, { useState } from "react";

import ChartFilter from "../../components/shared/filters/timeFilter";
import Title from "../../components/shared/layout/title";
import Head from "next/head";
import BarChart from "../../components/shared/charts/barChart";
import DashboardCard from "../../components/DECIDEUR/dashboardCard";

export default function DeciderDashboard() {
  const labels = [
    "Region 1",
    "Region 2",
    "Region 3",
    "Region 4",
    "Region 5",
    "Region 6",
    "Region 7",
  ];
  const getRandomData = () => {
    return labels.map(() => Math.floor(Math.random() * 100));
  };
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        data: getRandomData(),
        label: "Taux d'utilisation",
        borderColor: "rgb(109, 253, 181)",
        backgroundColor: "rgb(109, 253, 181,0.5)",
        borderWidth: 2,
      },
    ],
  });

  const [filter, setFilter] = useState("week");

  const handleFilterChange = (value) => {
    setFilter(value);

    let filteredData = [];

    if (value === "week") {
      // filtering for weekly data by api call
      filteredData = data;
    } else if (value === "month") {
      // filtering for monthly data by api call
      filteredData = data;
    } else if (value === "year") {
      // filtering for yearly data by api call
      filteredData = data;
    }

    setData(filteredData);
  };

  //chart
  return (
    <div className="text-center pt-8 flex flex-col items-center h-screen">
      <Head>
        <title>Tableau de bord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Tableau de bord" />
      <ChartFilter selectedFilter={filter} onChange={handleFilterChange} />
      <div className="w-full flex items-center  h-3/4 justify-around">
        <div className="w-3/5">
          <BarChart chartData={data} />
        </div>
        <div className="flex flex-col gap-8">
          <DashboardCard
            header={"Commandes"}
            data={{ Réussites: 5994, Défaillantes: 52 }}
          />
          <DashboardCard
            header={"Transactions"}
            data={{ Valides: 5994, Invalides: 52 }}
          />
          <DashboardCard
            header={"Régions"}
            data={{ "La plus active": 5994, "La moins active": 52 }}
          />
        </div>
      </div>
    </div>
  );
}
