import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/doctor-signup`}>Signup as Doctor</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* <li>
          <Link to="/DoctorAvailibility">DocAv</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
