import Image from "next/image";
import { useState } from "react";
import EditEmployeModal from "./editEmploye";
import { toast } from "react-toastify";

export default function EmployeItem({ employe, employees, setEmployees }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Remove the employee from the employees list
    const updatedEmployees = employees.filter(
      (emp) => emp.name !== employe.name
    );
    setEmployees(updatedEmployees);

    // Show success toast message
    toast.success("Employé supprimé avec succès !");

    // Close the modal if it's open
    setOpen(false);
  };

  return (
    <div className="w-full bg-white  flex items-center justify-between p-2 border rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-2">
      <p className="text-lg w-64">{employe.name}</p>
      <p className="text-lg w-64">{employe.role}</p>
      <p className="text-lg w-64">{employe.phone}</p>
      <p className="text-lg w-64">{employe.email}</p>
      <div className="flex">
        <Image
          className="cursor-pointer"
          width={40}
          height={40}
          src="/icons/editIcon.svg"
          alt="icône d'édition"
          onClick={() => {
            setOpen(true);
          }}
        ></Image>
        <Image
          className="cursor-pointer"
          width={40}
          height={40}
          src="/icons/deleteIcon.svg"
          alt="icône de suppression"
          onClick={handleDelete}
        ></Image>
      </div>
      <EditEmployeModal
        employee={employe}
        open={open}
        setOpen={setOpen}
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
}
