import Head from "next/head";
import { useRouter } from "next/router";
import LocationMap from "../../../components/ADM/Map";
import BarChart from "../../../components/shared/charts/barChart";
import { HorizontalBarChart } from "../../../components/shared/charts/horizontalBarChart";
import LineChart from "../../../components/shared/charts/lineChart";

import Title from "../../../components/shared/layout/title";

const Distributor = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className="text-center pt-8 flex flex-col items-center gap-20">
      <Head>
        <title>{`Distributeur : ${pid}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Distributeur" />
      <div className=" w-full flex justify-between px-20">
        <div className="text-start flex flex-col gap-4 ">
          <h2 className="font-bold text-5xl">N serie</h2>
          <p>Modele</p>
          <p>...</p>
          <div className=" flex justify-between ">
            <button className="py-3 px-4 bg-dark rounded-xl text-white">
              Marquer comme volé
            </button>
            <button className="py-3 px-4 border-2 border-dark bg-white rounded-xl text-dark">
              Demander maintenance
            </button>
          </div>
          <div className="rounded-xl shadow-2xl overflow-hidden w-[480px] h-[420px] ">
            <LocationMap />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="w-96 h-64  bg-black flex items-center justify-center bg-white rounded shadow-2xl">
            <HorizontalBarChart />
          </div>
          <div className="w-96  h-64 bg-black flex items-center justify-center bg-white rounded shadow-2xl">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distributor;
