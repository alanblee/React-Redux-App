import React from "react";

const BrewPub = ({ selectedPub }) => {
  return (
    <div className="pub-info">
      <h1>{selectedPub.name}</h1>
      <p>
        {selectedPub.city} {selectedPub.state}
      </p>
      <p>{selectedPub.street}</p>
      <p>{selectedPub.phone}</p>
      <ul>
        
      </ul>
      <p>{selectedPub.website_url}</p>
    </div>
  );
};
export default BrewPub;
