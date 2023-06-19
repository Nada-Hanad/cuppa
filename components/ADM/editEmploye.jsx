import { useState } from "react";
import { toast } from "react-toastify";
import distributorsData from "../../helpers/mocks/distributors.json";

export default function EditEmployeModal({
  open,
  setOpen,
  employee,
  employees,
  setEmployees,
}) {
  const [name, setName] = useState(employee.name);
  const [role, setRole] = useState(employee.role);
  const [phone, setPhone] = useState(employee.phone);
  const [email, setEmail] = useState(employee.email);
  const [selectedDistributors, setSelectedDistributors] = useState(
    employee.role === "AM" ? employee.distributors : []
  );
  console.log(employee.distributors);
  const [selectedDistributor, setSelectedDistributor] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDistributorChange = (e) => {
    setSelectedDistributor(e.target.value);
  };

  const handleAddDistributor = () => {
    if (
      selectedDistributor &&
      !selectedDistributors.includes(selectedDistributor)
    ) {
      setSelectedDistributors((prevSelectedDistributors) => [
        ...prevSelectedDistributors,
        selectedDistributor,
      ]);
      setSelectedDistributor("");
    }
  };

  const handleRemoveDistributor = (distributorId) => {
    setSelectedDistributors((prevSelectedDistributors) =>
      prevSelectedDistributors.filter(
        (distributor) => distributor !== distributorId
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the update action here
    const updatedEmployee = {
      ...employee,
      name,
      role,
      phone,
      email,
      distributors: selectedDistributors,
    };

    // Update the employee in the employees list
    const updatedEmployees = employees.map((emp) =>
      emp.name === employee.name ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);

    // Show success toast message
    toast.success("Employé mis à jour avec succès !");

    // Close the modal
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg w-96">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">{"Modifier l'employé"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="name">
                Nom :
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="role">
                Rôle :
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                id="role"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="ADM">ADM</option>
                <option value="AM">AM</option>
                <option value="AM">Décideur</option>
              </select>
            </div>
            {role === "AM" && (
              <div className="mb-4">
                <label className="block mb-2 font-bold" htmlFor="distributor">
                  Distributeur :
                </label>
                <div className="flex items-center">
                  <select
                    className="w-full px-3 py-2 border rounded"
                    id="distributor"
                    value={selectedDistributor}
                    onChange={handleDistributorChange}
                  >
                    <option value="">Sélectionner un distributeur</option>
                    {distributorsData.map((distributor) => (
                      <option
                        key={distributor.numero_serie_distributeur}
                        value={distributor.numero_serie_distributeur}
                      >
                        {distributor.numero_serie_distributeur}
                      </option>
                    ))}
                  </select>
                  <button
                    className="ml-2 px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    type="button"
                    onClick={handleAddDistributor}
                    disabled={!selectedDistributor}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            )}
            {selectedDistributors.length > 0 && (
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Distributeurs sélectionnés :
                </label>
                <div className="space-y-2">
                  {selectedDistributors.map((distributorId) => {
                    const distributor = distributorsData.find(
                      (d) => d.numero_serie_distributeur === distributorId
                    );
                    return (
                      <div
                        key={distributorId}
                        className="flex items-center justify-between"
                      >
                        <span className="mr-2">
                          {distributor.numero_serie_distributeur}
                        </span>
                        <button
                          className="px-2 py-1 text-red-500 hover:text-red-700"
                          type="button"
                          onClick={() => handleRemoveDistributor(distributorId)}
                        >
                          Supprimer
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="phone">
                Téléphone :
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="email">
                Email :
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                type="submit"
              >
                Mettre à jour
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleClose}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
