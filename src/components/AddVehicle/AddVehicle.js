import React, { useState } from "react";

function AddVehicle() {
  const [vehicleData, setVehicleData] = useState([]);

  const handleAdd = (newVehicle) => {
    setVehicleData((prevData) => {
      const updatedData = [...prevData, newVehicle];
      const storedData = localStorage.getItem("vehicleData");
      let allData = [];
      if (storedData) {
        allData = JSON.parse(storedData);
      }
      const updatedAllData = [...allData, newVehicle];
      localStorage.setItem("vehicleData", JSON.stringify(updatedAllData));
      return updatedData;
    });
  };
  
  

  return (
    <div className="">
      <h1>Add Vehicle</h1>
      {/* Add Vehicle form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newVehicle = Object.fromEntries(formData.entries());
          handleAdd(newVehicle);
          e.target.reset();
        }}
      >
        <div
          className="ui_text_field"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            left: "650px",
          }}
        >
          <input type="number" name="id" placeholder="Vehicle ID" required />

          <input type="text" name="name" placeholder="Vehicle Name" required />
          <input type="number" name="posX" placeholder="Position X" required />

          <input type="number" name="posY" placeholder="Position Y" required />
          <div className="ui_text_field">
            <input
              type="text"
              name="direction"
              placeholder="Direction"
              required
            />
            <div>
              <button
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "blue",
                  color: "white",
                  margin: "30px",
                }}
                className="button-container"
                type="submit"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddVehicle;