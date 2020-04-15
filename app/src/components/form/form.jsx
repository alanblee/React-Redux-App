import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchBreweries } from "../../redux/actions/breweryActions";
import "./form.scss";

const SearchForm = ({ fetchBreweries }) => {
  const [formInput, setFormInput] = useState({
    city: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormInput({
      [name]: value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    let formatCity = formInput.city.replace(" ", "_");
    fetchBreweries(formatCity);
    setFormInput({
      city: "",
    });
  };
  return (
    <form onSubmit={onFormSubmit} className="form-wrapper">
      <input
        className="form-input"
        type="text"
        name="city"
        value={formInput.city}
        onChange={handleChange}
        placeholder="Enter city"
      />
      <button className="form-submit">
        <i className="fas fa-beer"></i>
      </button>
    </form>
  );
};
const actions = { fetchBreweries };
export default connect(null, actions)(SearchForm);
