import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // useEffect(() => {
  //   // console.log(token);
  //   if (token) {
  //     navigate("/doctor-dashboard");
  //   }
  //   // TODO: Reroute to dashboard according to user type
  // }, [token]);

  useEffect(() => {
    if (token) setTimeout(() => navigate("/doctor-dashboard"), 1000);
  }, []);

  if (token) {
    return <div className="reroute-message">Please logout to access!</div>;
  }

  return (
    <div id="signup-page">
      <div className="signup-box" id="doctor-signup-box">
        <Link to={"/doctor-signup"}>Signup as a doctor</Link>
      </div>
      <div className="signup-box" id="user-signup-box">
        Signup as a user
      </div>
    </div>
  );
}
