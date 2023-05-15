import React, { useState, useEffect } from "react";
import "./Home.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import Map from "../../Map/Map";

function Home() {
  const [vehicleData, setVehicleData] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    id: "",
    name: "",
    posX: "",
    posY: "",
    speed: "",
    direction: ""
  });

  useEffect(() => {
    const storedData = localStorage.getItem("vehicleData");
    if (storedData) {
      setVehicleData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
  }, [vehicleData]);

  const saveVehicleData = (updatedData) => {
    setVehicleData(updatedData);
  };

  const deleteVehicleData = (id) => {
    const updatedData = vehicleData.filter((vehicle) => vehicle.id !== id);
    setVehicleData(updatedData);
  };

  const handleEdit = (id) => {
    // Find the index of the vehicle with the given id
    const index = vehicleData.findIndex((vehicle) => vehicle.id === id);
    if (index !== -1) {
      // Create a copy of the vehicleData array
      const updatedData = [...vehicleData];

      // Update the vehicle object at the found index
      updatedData[index] = { ...updatedData[index], ...newVehicle };

      // Update the vehicleData state with the edited data
      setVehicleData(updatedData);

      // Reset the newVehicle state
      setNewVehicle({
        id: "",
        name: "",
        posX: "",
        posY: "",
        speed: "",
        direction: ""
      });
    }
  };

  const handleAdd = () => {
    // Add the new vehicle to the vehicleData state
    saveVehicleData([...vehicleData, newVehicle]);

    // Reset the newVehicle state
    setNewVehicle({
      id: "",
      name: "",
      posX: "",
      posY: "",
      speed: "",
      direction: ""
    });
  };

  return (
    <div className="table-wrapper">
      <h1 style={{ color: "white" }}>Home</h1>

      <table>
        <thead>
          <tr>
            <th>Vehicle Id</th>
            <th>Vehicle Name</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vehicleData.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>
                <span>
                  <span className="fi fi-af"></span>
                </span>
                <span>{vehicle.id}</span>
              </td>
              <td>{vehicle.name}</td>
              <td>{vehicle.posX}</td>
              <td>{vehicle.posY}</td>
              <td>{vehicle.speed}</td>
              <td>{vehicle.direction}</td>
              <td>
                <BsFillPencilFill onClick={() => handleEdit(vehicle.id)} />
              </td>
              <td>
                <AiFillDelete onClick={() => deleteVehicleData(vehicle.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add vehicle form */}
      <div className="add-vehicle-form">
      
       
  
      </div>

      <Map />
    </div>
  );
}
export default Home;