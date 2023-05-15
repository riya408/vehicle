import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddScenario" activeClassName="active">
            Add Scenario
          </NavLink>
        </li>
        <li>
          <NavLink to="/AllScenario" activeClassName="active">
            All Scenarios
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddVechile" activeClassName="active">
            Add Vehicle
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;