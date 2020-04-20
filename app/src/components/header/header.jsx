import React from "react";

import SearchForm from "../form/form";
import "./header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <img src={require("../../beer.svg")} alt="" />
      <SearchForm />
    </div>
  );
};

export default Header;
