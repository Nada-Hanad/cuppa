import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddDistributorModal({ distributors, setDistributors }) {
  const [showModal, setShowModal] = useState(false);

  // Define the distributor schema for form validation
  const distributorSchema = Yup.object().shape({
    numero_serie_distributeur: Yup.string().required(
      "Le numéro de série est requis"
    ),
    etat_distributeur: Yup.string().required(
      " L'état du distributeur est requis"
    ),
    date_installation_distributeur: Yup.date().required(
      "La date d'installation est requise"
    ),
    localisation_statique_distributeur: Yup.string().required(
      "La localisation statique est requise"
    ),
  });

  const handleSave = (values) => {
    // Validate form fields
    distributorSchema
      .validate(values)
      .then((validValues) => {
        const newDistributor = {
          numero_serie_distributeur: validValues.numero_serie_distributeur,
          etat_distributeur: validValues.etat_distributeur || null,
          date_installation_distributeur:
            validValues.date_installation_distributeur || null,
          localisation_statique_distributeur:
            validValues.localisation_statique_distributeur || null,
        };

        // Add the new distributor to the list of distributors
        setDistributors([...distributors, newDistributor]);

        // Reset the form
        setShowModal(false);

        toast.success("Distributeur ajouté avec succès");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmit = (values) => {
    handleSave(values);
  };

  return (
    <>
      <button
        className="px-4 py-4 bg-dark-grey rounded text-white self-end mr-12"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ajouter Distributeur
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none modal">
                <Formik
                  initialValues={{
                    numero_serie_distributeur: "",
                    etat_distributeur: "",
                    date_installation_distributeur: "",
                    localisation_statique_distributeur: "",
                  }}
                  validationSchema={distributorSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="p-8">
                        <h3 className="text-lg font-semibold mb-4">
                          Ajouter un distributeur
                        </h3>
                        <div className="flex flex-col mb-4">
                          <label className="text-sm mb-1">
                            Numéro de série du distributeur
                          </label>
                          <Field
                            type="text"
                            name="numero_serie_distributeur"
                            className="border border-gray-300 rounded-md p-2"
                          />
                          <ErrorMessage
                            name="numero_serie_distributeur"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <div className="flex flex-col mb-4">
                            <label className="text-sm mb-1">
                              État du distributeur
                            </label>
                            <Field
                              as="select"
                              name="etat_distributeur"
                              className="border border-gray-300 p-2 rounded-md"
                            >
                              <option value="active">Actif</option>
                              <option value="inactive">Inactif</option>
                            </Field>
                          </div>

                          <ErrorMessage
                            name="etat_distributeur"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label className="text-sm mb-1">
                            {" Date d'installation du distributeur"}
                          </label>
                          <Field
                            type="date"
                            name="date_installation_distributeur"
                            className="border border-gray-300 rounded-md p-2"
                          />
                          <ErrorMessage
                            name="date_installation_distributeur"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label className="text-sm mb-1">
                            Localisation statique du distributeur
                          </label>
                          <Field
                            type="text"
                            name="localisation_statique_distributeur"
                            className="border border-gray-300 rounded-md p-2"
                          />
                          <ErrorMessage
                            name="localisation_statique_distributeur"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 rounded-md text-white font-semibold disabled:opacity-50"
                          >
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 ml-4 bg-gray-500 rounded-md text-white font-semibold"
                            onClick={() => setShowModal(false)}
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
