import "./App.css";
import React from "react";
import { ReactDOM } from "react";
import BasicPie from "./Components/PieChart";
import BasicContainer from "./Components/Container";


function App() {

  return (
    <>
      {/* <h1>InsightECR</h1> */}
        <BasicContainer component={BasicPie} />

    </>
  );
}

export default App;
