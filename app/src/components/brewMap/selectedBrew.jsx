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
      <ul className="social-links">
        <li>
          <i className="fab fa-facebook-f"></i>
        </li>
        <li>
          <i className="fab fa-twitter"></i>
        </li>
        <li>
          <i class="fab fa-chrome"></i>
        </li>
        <li>
          <i class="fab fa-instagram-square"></i>
        </li>
      </ul>
    </div>
  );
};
export default BrewPub;
