import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function Navbar() {
  const { token } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        {!token && (
          <>
            <li>
              <Link to={`/signup`}>Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/doctor-dashboard">Doctor dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
