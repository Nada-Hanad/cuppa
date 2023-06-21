import { useState } from "react";
import Head from "next/head";
import StatCard from "../../components/shared/cards/statCard";
import LineChart from "../../components/shared/charts/lineChart";
import DoughnutChart from "../../components/shared/charts/doughnut";
import BarChart from "../../components/shared/charts/barChart";
import Title from "../../components/shared/layout/title";

import chartData from "../../helpers/mocks/dashboard.json";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function ADMDashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const [chartFilter, setChartFilter] = useState("month");

  const stats = [
    {
      icon: "/icons/activeDistributors.svg",
      title: "Nº distributeurs actifs",
      stat: chartData.distributorMonitoring.activeDistributors,
    },
    {
      icon: "/icons/maintenance.svg",
      title: "Nº demandes de maintenance",
      stat: chartData.lineChartData.maintenanceRequests[
        chartFilter
      ].data.reduce((a, b) => a + b, 0),
    },
    {
      icon: "/icons/reclamations.svg",
      title: "Nº reclamations",
      stat: chartData.lineChartData.complaints[chartFilter].data.reduce(
        (a, b) => a + b,
        0
      ),
    },
  ];

  const handleChartFilterChange = (filter) => {
    setChartFilter(filter);
  };
  let lineChartData = {
    labels: chartData.lineChartData.revenue[chartFilter].labels,
    datasets: [
      {
        data: chartData.lineChartData.maintenanceRequests[chartFilter].data,
        label: "Demandes de maintenances",
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192,0.5)",
        borderWidth: 2,
      },
      {
        data: chartData.lineChartData.complaints[chartFilter].data,
        label: "Réclamations",
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgb(255, 205, 86,0.5)",
        borderWidth: 2,
      },
    ],
  };
  let revenueData = {
    labels: chartData.lineChartData.revenue[chartFilter].labels,
    datasets: [
      {
        data: chartData.lineChartData.revenue[chartFilter].data,
        label: "Revenue",
        borderColor: "rgb(109, 253, 181)",
        backgroundColor: "rgb(109, 253, 181,0.5)",
        borderWidth: 2,
      },
    ],
  };
  let barChartData = {
    labels: chartData.barChartData.revenueByRegion.labels,
    datasets: [
      {
        data: chartData.barChartData.revenueByRegion.data,
        label: "Demandes de maintenances",
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192,0.5)",
        borderWidth: 2,
      },
    ],
  };
  let barChartData2 = {
    labels: chartData.barChartData.costByCategory.labels,
    datasets: [
      {
        data: chartData.barChartData.costByCategory.data,
        label: "Coût par catégorie",
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgb(255, 205, 86,0.5)",
        borderWidth: 2,
      },
    ],
  };
  let barChartData3 = {
    labels: chartData.barChartData.complaintsByType.labels,
    datasets: [
      {
        data: chartData.barChartData.complaintsByType.data,
        label: "Réclamations par type",
        borderColor: "rgb(109, 253, 181)",
        backgroundColor: "rgb(109, 253, 181,0.5)",
        borderWidth: 2,
      },
    ],
  };
  let donutChartData = {
    labels: chartData.doughnutChartData.activeInactiveDistributors.labels,
    datasets: [
      {
        data: chartData.doughnutChartData.activeInactiveDistributors.data,
        label: "Distributeurs",
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderWidth: 2,
      },
    ],
  };
  let donutChartData2 = {
    labels: chartData.doughnutChartData.maintenanceType.labels,
    datasets: [
      {
        data: chartData.doughnutChartData.maintenanceType.data,
        label: "Type de maintenance",
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="text-center pt-8 flex flex-col items-center gap-20 pb-12">
      <Head>
        <title>Tableau de bord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Tableau de bord" />
      {loading ? (
        <div className="h-[500px] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="w-[90%] mx-auto flex gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s.stat} title={s.title} icon={s.icon} />
            ))}
          </div>
          <div className="flex w-full gap-6">
            <div className="w-2/3 flex flex-col gap-6">
              <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
                <LineChart
                  data={lineChartData}
                  title="Revenues"
                  filter={chartFilter}
                  onFilterChange={handleChartFilterChange}
                />
              </div>
              <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
                <LineChart
                  data={revenueData}
                  title="Revenues"
                  filter={chartFilter}
                  onFilterChange={handleChartFilterChange}
                />
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-5">
              <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
                <BarChart chartData={barChartData} title="Revenu par région" />
              </div>
              <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
                <BarChart
                  chartData={barChartData2}
                  title="Coût par catégorie"
                />
              </div>
              <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
                <BarChart
                  chartData={barChartData3}
                  title="Réclamations par type"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-5">
            <div className="w-2/5 flex justify-center items-center  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
              <DoughnutChart data={donutChartData} title="Etat Distributeurs" />
            </div>
            <div className="w-2/5 flex justify-center items-center bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded p-4">
              <DoughnutChart
                data={donutChartData2}
                title="Type de maintenance"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
