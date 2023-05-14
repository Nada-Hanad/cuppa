import Head from "next/head";
import DistributorCard from "../../components/ADM/distributorCard";
import FilterButton from "../../components/shared/filters/filterButton";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import Title from "../../components/shared/layout/title";
import BoissonCard from "../../components/AC/pubsCard";
import { useEffect, useState } from "react";
import FilterSection from "../../components/shared/filters/filterSection";
import AddAdModal from "../../components/AC/addAd";
import { API_URL } from "../../config/api";
import axios from "axios";

export default function Ads() {
  const defaultData = [
    {
      id: 0,
      name: "coffee beans",
      showTime: "jours",
      price: 4.99,
      sexe: "M",
      minAge: 10,
      maxAge: 20,
      videoPath:
        "COFFEE COMMERCIAL ADVERTISEMENT - 7 miles roasters coffee beans ad.mp4",
    },
    {
      id: 1,
      name: "Kia EV9",
      showTime: "semaines",
      price: 5.99,
      minAge: 10,
      maxAge: 20,
      sexe: "F",
      videoPath: "Introducing the Kia EV9.mp4",
    },
    {
      id: 2,
      name: "Diet Coke",
      showTime: "mois",
      price: 3.99,
      minAge: 10,
      maxAge: 20,
      sexe: "B",
      videoPath:
        "Life is Short, Have a Diet Coke _ Because I Can _ Diet Coke GB.mp4",
    },

    {
      id: 3,
      name: "Earl Grey Tea",
      showTime: "jours",
      sexe: "M",
      minAge: 10,
      maxAge: 20,
      price: 2.99,
      videoPath:
        "Life is Short, Have a Diet Coke _ Because I Can _ Diet Coke GB.mp4",
    },
  ];
  function handleSearch(enteredWord) {
    const searchTerms = enteredWord.toLowerCase().split(" ");
    const filteredAds = defaultData.filter((Ad) => {
      const nameLower = Ad.name.toLowerCase();
      return searchTerms.every((term) => nameLower.includes(term));
    });
    setAds(filteredAds);
  }
  const [Ads, setAds] = useState([]);
  const [Annoceurs, setAnnoceurs] = useState([
    { id_annonceur: 1, nom_annonceur: "Advertiser 1" },
    { id_annonceur: 2, nom_annonceur: "Advertiser 2" },
    { id_annonceur: 3, nom_annonceur: "Advertiser 3" },
    // Add more advertisers as needed
  ]);
  const fetchAdvertisers = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(`${API_URL}/api/ads/getAllAdvertisers/`, config)
      .catch((e) => console.log(e));
    if (response) {
      const advtisers = response.data;
      console.log(`advtisers  ----------------------------------`);

      console.log(advtisers);
      console.log(`advtisers  ----------------------------------`);
      setAnnoceurs(advtisers);
    }
  };
  const fetchAdvertisements = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(`${API_URL}/api/ads/getAllAdvertisements/`, config)
      .catch((e) => console.log(e));
    if (response) {
      const Ads = response.data;
      setAds(Ads);
    }
  };

  // fetch the ads after the compnonts is load

  useEffect(() => {
    console.log("hiiiiiiiiiiii");
    fetchAdvertisements();
    fetchAdvertisers();
    console.log("********************************");
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 text-center">
      <Head>
        <title>Annoces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Annoces" />

      <AddAdModal
        fetchAdvertisements={fetchAdvertisements}
        advertisers={Annoceurs}
      />

      <div className="flex justify-between h-full gap-10 my-8">
        <SearchBar
          placeholder={"Nom du Annoce..."}
          handleSearch={handleSearch}
        />
        <FilterSection
          placeholders={{
            first: "Min Age...",
            second: "Max Age...",
          }}
          data={defaultData}
          setData={setAds}
          attribute={"price"}
        />
      </div>
      <div className="grid grid-cols-3 gap-12">
        {Ads.map((Ad, i) => (
          <BoissonCard
            key={i}
            Ad={Ad}
            fetchAdvertisements={fetchAdvertisements}
          />
        ))}
      </div>
    </div>
  );
}
