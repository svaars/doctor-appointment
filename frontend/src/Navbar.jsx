import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Button } from "antd";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to={`/signup`}>Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ):<Button onClick={()=>{logout()}}>Logout</Button>}

        <li>
          <Link to="/doctor/app">Doctor dashboard</Link>
        </li>
        <li>
          <Link to="/patient/app">Patient dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
