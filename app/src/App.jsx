import React from "react";

import Header from "./components/header/header";
import BrewMap from "./components/brewMap/brewMap";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <BrewMap />
    </div>
  );
}

export default App;
