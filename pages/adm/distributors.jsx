import Head from "next/head";
import DistributorCard from "../../components/ADM/distributorCard";
import FilterButton from "../../components/shared/filterButton";
import Input from "../../components/shared/input";
import SearchBar from "../../components/shared/searchBar";
import Title from "../../components/shared/title";

export default function Distributors() {
  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Distributeurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Distributeurs" />
      <div className="px-4 py-4 bg-dark-grey rounded-xl text-white self-end mr-12">
        Ajouter distributeur
      </div>
      <div className="flex my-8 justify-between h-full gap-10">
        <SearchBar placeholder={"Numéro de serie..."} />
        <Input placeholder="Nombre min..." />
        <Input placeholder="Nombre max..." />
        <FilterButton />
      </div>
      <div className="">
        <DistributorCard />
      </div>
    </div>
  );
}
