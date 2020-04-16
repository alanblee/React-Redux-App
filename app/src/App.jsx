import React from "react";
import { connect } from "react-redux";
import Header from "./components/header/header";
import BrewMap from "./components/brewMap/brewMap";
import "./App.scss";

function App({ brewData }) {
  return (
    <div className="App">
      <Header />
      {brewData.length ? <BrewMap/> : null}
    </div>
  );
}
const mapState = (state) => ({
  brewData: state.breweryData.brews,
});
export default connect(mapState, null)(App);
