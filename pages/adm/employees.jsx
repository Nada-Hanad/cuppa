import Head from "next/head";
import Title from "../../components/shared/layout/title";
import FilterButton from "../../components/shared/filters/filterButton";
import Input from "../../components/shared/inputs/input";
import SearchBar from "../../components/shared/search/searchBar";
import EmployeItem from "../../components/ADM/EmployeItem";
import empData from "../../helpers/mocks/employees.json";
import { useState } from "react";
import AddEmployeeModal from "../../components/ADM/addEmployeeModal";

export default function Employees() {
  const [openAdd, setOpenAdd] = useState(false);
  const [emp, setEmp] = useState(empData.employees);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setEmp(
      value === ""
        ? [...empData.employees]
        : emp.filter((e) =>
            e.name.toLowerCase().startsWith(value.toLowerCase())
          )
    );
  };

  const handleOpenAddModal = () => {
    setOpenAdd(true);
  };

  const handleFilterClick = () => {
    if (selectedRole == "all") {
      setEmp(empData.employees);
    } else {
      const filteredEmployees = empData.employees.filter(
        (employee) => employee.role === selectedRole
      );
      setEmp(filteredEmployees);
    }
  };

  return (
    <div className="text-center pt-8 flex flex-col items-center">
      <Head>
        <title>Employé</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title title="Employés" />
      <div className="w-full flex my-8 justify-between h-full gap-10">
        <SearchBar
          handleSearch={handleSearchChange}
          placeholder="Nom employé..."
        />
        <select
          className="px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded cursor-pointer"
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="all">Tous</option>
          <option value="AC">AC</option>
          <option value="AM">AM</option>
          <option value="Decideur">Décideur</option>
        </select>
        <FilterButton onClick={handleFilterClick} />
        <button
          className="px-4 py-2 text-white bg-dark-grey rounded  hover:bg-bg-grey transition-all hover:text-dark-grey"
          onClick={handleOpenAddModal}
        >
          Add Employee
        </button>
      </div>
      <div className="w-full">
        <div className="w-full bg-dark-grey p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded mb-2 flex text-white justify-between px-4 items-center">
          <p className="w-64">Nom</p>
          <p className="w-64">Role</p>
          <p className="w-64">Nº Téléphone</p>
          <p className="w-64">Email</p>
          <div className="w-20"></div>
        </div>
      </div>
      <div className="w-full">
        {emp.map((e) => {
          return (
            <EmployeItem
              key={e.name}
              employe={e}
              employees={emp}
              setEmployees={setEmp}
            />
          );
        })}
      </div>

      <AddEmployeeModal
        employees={emp}
        setEmployees={setEmp}
        open={openAdd}
        setOpen={setOpenAdd}
      />
    </div>
  );
}
