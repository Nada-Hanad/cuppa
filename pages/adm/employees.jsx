import Head from "next/head";
import Title from "../../components/shared/title";

import FilterButton from "../../components/shared/filterButton";
import Input from "../../components/shared/input";
import SearchBar from "../../components/shared/searchBar";
import EmployeItem from "../../components/ADM/EmployeItem";
export default function Employees() {
  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Employé</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Employés" />

      <div className="flex my-8 justify-between h-full gap-10">
        <SearchBar placeholder="Nom employé..." />
        <Input placeholder="Nombre min..." />
        <Input placeholder="Nombre max..." />
        <FilterButton />
      </div>
      <div className="w-5/6">
        <div className="w-full bg-dark-grey h-12 rounded-t-xl flex text-white justify-between px-4 items-center">
          <p className="w-12">Photo</p>
          <p className=" w-64 ">Nom</p>
          <p className=" w-64 ">Type</p>
          <p className=" w-64 ">Date</p>
          <div className="w-20"></div>
        </div>
      </div>
      <div className="w-5/6">
        <EmployeItem />
        <EmployeItem />
        <EmployeItem />
      </div>
    </div>
  );
}
