import React from 'react';

const ClientIDCard = ({ client }) => {
  return (
    <div className="id-card bg-white shadow-lg rounded-md p-4 w-[500px] h-[250px] text-[#343A49]">
      <div className="id-card-header mb-4">
        <h2 className="text-xl font-bold">les information de client </h2>
      </div>
      <div className="id-card-body flex items-center">
        <div className="id-card-info mr-8 flex-col justify-evenly">
          <div className="text-xl font-bold">
            <strong >le  nom de client:</strong> {client.nom_client}
          </div>
          <div className="text-xl font-bold">
            <strong >le type de client:</strong> {client.type_client}
          </div>
          <div className="text-xl font-bold">
            <strong >nb_distributeurs:</strong> {client.nb_distributeurs}
          </div>
          </div>
      </div>
    </div>
  );
};

export default ClientIDCard;
