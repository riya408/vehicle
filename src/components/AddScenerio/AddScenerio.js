import React, { useState } from "react";
import "./AddScenerio.css";
import axios from "axios";

function AddScenario() {
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioTime, setScenarioTime] = useState("");

  const handleAdd = () => {
    // Prepare the data object to be sent in the POST request
    const newScenario = {
      ScenariosName: scenarioName,
      ScenariosTime: scenarioTime,
    };

    axios
      .post("https://apexdbjsong.onrender.com/Scenarios", newScenario)
      .then((res) => {
        console.log("Scenario added successfully!");
        // Clear the input fields
        setScenarioName("");
        setScenarioTime("");
      })
      .catch((err) => {
        console.error("Failed to add scenario:", err);
        // Handle error state or show error message to the user
      });
  };

  return (
    <>
      <div className="addscenario">
        <div
          style={{
            display: "flex",
            marginLeft: "120px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
          }}
        >
          <h1>AddScenario</h1>

          <div className="container">
            <div className="ui_text_field">
              <input
                placeholder="Scenario name"
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
              <label>Scenario name</label>
            </div>
            <div className="ui_text_field">
              <input
                placeholder="Scenario Time"
                type="number"
                value={scenarioTime}
                onChange={(e) => setScenarioTime(e.target.value)}
              />
              <label>Scenario Time</label>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button id="Add" onClick={handleAdd}>
          Add
        </button>
        <button id="reset">Reset</button>
        <button id="goback">Go Back</button>
      </div>
    </>
  );
}

export default AddScenario;
