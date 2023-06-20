import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationMap from "../../../components/ADM/Map";
import BarChart from "../../../components/shared/charts/barChart";
import { HorizontalBarChart } from "../../../components/shared/charts/horizontalBarChart";
import LineChart from "../../../components/shared/charts/lineChart";
import dataDef from "../../../helpers/mocks/distributors.json";
import Title from "../../../components/shared/layout/title";

const Distributor = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [distributor, setDistributor] = useState(null);

  useEffect(() => {
    // Fetch distributor data from the JSON file or API
    const fetchDistributorData = async () => {
      const data = dataDef;
      const selectedDistributor = data.find((item) => item._id === pid);
      setDistributor(selectedDistributor);
    };

    fetchDistributorData();
  }, [pid]);

  const createChartData = () => {
    const labels = distributor.ingredients.map((ingredient) => ingredient.name);
    const data = distributor.ingredients.map((ingredient) => ingredient.level);

    return {
      labels,
      datasets: [
        {
          data,
          label: "Taux d'utilisation",
          borderColor: "rgb(109, 253, 181)",
          backgroundColor: "rgb(109, 253, 181,0.5)",
          borderWidth: 2,
        },
      ],
    };
  };

  const buttonTexts = {
    markAsStolen: "Marquer comme volé",
    requestMaintenance: "Demander maintenance",
  };

  const successMessages = {
    markAsStolen: "Le distributeur a été marqué comme volé avec succès.",
    requestMaintenance: "La demande de maintenance a été envoyée avec succès.",
  };

  const handleMarkAsStolen = () => {
    toast.success(successMessages.markAsStolen);
  };

  const handleRequestMaintenance = () => {
    toast.success(successMessages.requestMaintenance);
  };

  return (
    <div className="text-center pt-8 flex flex-col items-center gap-20 pb-12">
      <Head>
        <title>{`Distributeur : ${pid}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Distributeur" />
      {distributor && (
        <div className="w-full flex justify-between px-20">
          <div className="text-start flex flex-col gap-4">
            <h2 className="font-bold text-5xl">
              {distributor.numero_serie_distributeur}
            </h2>
            <p>
              Localisation: {distributor.localisation_statique_distributeur}
            </p>
            <p>Etat: {distributor.etat_distributeur}</p>
            <p>
              {"Date d'installation"}:{" "}
              {distributor.date_installation_distributeur}
            </p>
            <div className="flex justify-between">
              <button
                className="py-3 px-4 bg-dark rounded-xl text-white hover:bg-white hover:text-dark shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all"
                onClick={handleMarkAsStolen}
              >
                {buttonTexts.markAsStolen}
              </button>
              <button
                className="py-3 px-4 border-2 border-dark bg-white rounded-xl text-dark hover:text-white hover:bg-dark transition-all"
                onClick={handleRequestMaintenance}
              >
                {buttonTexts.requestMaintenance}
              </button>
            </div>
            <div className="rounded-xl shadow-2xl overflow-hidden w-[480px] h-[420px]">
              <LocationMap />
            </div>
          </div>
          <div className="flex flex-col justify-around items-center">
            <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-red-500 rounded p-4 w-40 flex flex-col justify-center items-center">
              <p>Eau </p>
              <p>{distributor.water_temperature}°C</p>
            </div>

            <div className="w-96 h-64 flex items-center justify-center bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <HorizontalBarChart data={createChartData()} />
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Distributor;
