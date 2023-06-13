import React from 'react';

const ClientIDCard = ({ client }) => {
  return (
    <div className="id-card bg-white shadow-lg rounded-md p-4">
      <div className="id-card-header mb-4">
        <h2 className="text-xl font-bold">les information de client </h2>
      </div>
      <div className="id-card-body flex items-center">
        <div className="id-card-info mr-8">
          <h3 className="text-lg font-bold mb-2">{client.name}</h3>
          <p className="text-sm">
            <strong className="font-semibold">le  nom de client:</strong> {client.client}
          </p>
          <p className="text-sm">
            <strong className="font-semibold">le type de client:</strong> {client.type_client}
          </p>
          <p className="text-sm">
            <strong className="font-semibold">nb_distributeurs:</strong> {client.nb_distributeurs}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientIDCard;
