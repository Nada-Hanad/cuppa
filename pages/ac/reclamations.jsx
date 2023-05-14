import Head from "next/head";
import FilterButton from "../../components/shared/filters/filterButton";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import Title from "../../components/shared/layout/title";
import FilterItem from "../../components/shared/filters/filterItem";
import ReclamationCard from "../../components/AC/reclamationCard";

export default function Profil() {
  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Reclamation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Reclamation" />

      <div className="flex my-8 justify-between h-full gap-10">
        <SearchBar placeholder={"Numéro de serie..."} />
        <FilterItem type={"Semaine"} />
        <FilterItem type={"Mois"} />
        <FilterItem type={"Année"} />
      </div>
      <div className="">
        <ReclamationCard />
      </div>
    </div>
  );
}
