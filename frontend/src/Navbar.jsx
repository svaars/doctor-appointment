import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="DoctorCard">DC</Link>
        </li>
        <li>
          <Link to="/DatePicker">AppSc</Link>
        </li> 
        <li>
          <Link to="/DoctorAvailibility">DocAv</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;