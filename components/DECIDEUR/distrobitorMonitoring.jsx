import React from "react";

const DistributorMonitoring = ({
  totalDistributors,
  activeDistributors,
  disconnectedDistributors,
  outOfServiceDistributors,
}) => {
  return (
    <div className=" p-2 w-72 bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3">
      <div className="p-3 bg-dark-grey text-white rounded ">
        Surveillance des distributeurs
      </div>
      <div className="flex justify-between px-4">
        <p>Total des distributeurs</p>
        <p> {totalDistributors}</p>
      </div>
      <div className="flex justify-between px-4">
        <p>Distributeurs actifs</p>
        <p> {activeDistributors}</p>
      </div>
      <div className="flex justify-between px-4">
        <p>Distributeurs déconnectés</p>
        <p> {disconnectedDistributors}</p>
      </div>
      <div className="flex justify-between px-4">
        <p>Distributeurs hors service</p>
        <p> {outOfServiceDistributors}</p>
      </div>
    </div>
  );
};

export default DistributorMonitoring;
