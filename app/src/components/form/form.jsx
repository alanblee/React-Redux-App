import React, { useState } from "react";
import "./form.scss";

const SearchForm = () => {
  const [formInput, setFormInput] = useState({
    zipcode: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormInput({
      [name]: [value],
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(formInput);
  };

  return (
    <form onSubmit={onFormSubmit} className="form-wrapper">
      <input
        className="form-input"
        type="text"
        name="zipcode"
        value={formInput.zipcode}
        onChange={handleChange}
        placeholder="Enter zipcode"
        required
      />
      <button className="form-submit">
        <i className="fas fa-beer"></i>
      </button>
    </form>
  );
};

export default SearchForm;
