import React from "react";
import  Navbar from "./sidebar/Sidebar"
import { Routes, Route } from "react-router";
import Home from "./components/Home/Home";
import AllScenerio from "./components/AllScenerio/AllScenerio"
import AddVehicle from "./components/AddVehicle/AddVehicle";
import AddScenario from "./components/AddScenerio/AddScenerio";
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddScenario" element={<AddScenario />} />
        <Route path="/AddVechile" element={<AddVehicle />} />
        <Route path="/AllScenerio" element={<AllScenerio />} />
      </Routes>
    </div>
  );
}

export default App;