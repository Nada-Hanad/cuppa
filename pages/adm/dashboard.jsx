import Head from "next/head";
import StatCard from "../../components/shared/statCard";
import LineChart from "../../components/shared/lineChart";
import DoughnutChart from "../../components/shared/doughnut";
import BarChart from "../../components/shared/barChart";
import Title from "../../components/shared/title";

export default function ADMDashboard() {
  const stats = [
    {
      icon: "/icons/activeDistributors.svg",
      title: "Nº distributeurs actifs",
      stat: "32",
    },
    {
      icon: "/icons/maintenance.svg",
      title: "Nº demandes de maintenance",
      stat: "32",
    },
    {
      icon: "/icons/reclamations.svg",
      title: "Nº reclamations",
      stat: "2",
    },
  ];
  return (
    <div className="text-center pt-8 flex flex-col items-center gap-20">
      <Head>
        <title>Tableau de bord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Tableau de bord" />

      <div className="w-full flex">
        <div className="flex flex-col w-2/3 gap-10">
          <div className="w-[90%] mx-auto flex gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s.stat} title={s.title} icon={s.icon} />
            ))}
          </div>
          <LineChart />
        </div>
        <div className="w-1/3 h-full p-4 gap-10 flex flex-col">
          <BarChart />
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
}
