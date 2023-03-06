import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="singup-page">
      <div className="signup-box" id="doctor-signup-box">
        <Link to={"/doctor-signup"}>Signup as a doctor</Link>
      </div>
      <div className="signup-box" id="user-signup-box">
        Signup as a user
      </div>
    </div>
  );
}
