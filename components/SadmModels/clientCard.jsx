import React from 'react';

const ClientIDCard = ({ client }) => {
  return (
    <div className="id-card bg-white shadow-lg rounded-md p-4 w-[500px] h-[250px] text-[#343A49]">
      <div className="id-card-header mb-5">
        <h2 className="text-[25px] font-bold">les information de client </h2>
      </div>
      <div className='text-xl font-bold '>
        <div className='flex  justify-start gap-5 w-[80%] mb-4' >
          <h3>le  nom de client:</h3>
          <h3> {client.nom_client} </h3>
        </div>
        <div className='flex  justify-start gap-5 w-[80%] mb-4'>
          <h3>le type de client:</h3>
          <h3> {client.type_client}</h3>
        </div>
        <div className='flex  justify-start gap-5 w-[80%] mb-4'>
          <h3> nombre de distributeurs:</h3>
          <h3>{client.nb_distributeurs} </h3>

        </div>
      </div>
      
    </div>
  );
};

export default ClientIDCard;
