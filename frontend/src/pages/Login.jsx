import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/Forms/LoginForm";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // If token is not available ask the user to login
  //   if (token) {
  //     navigate("/doctor-dashboard"); // should be dashboard and let dashboard choose which user depending on the user
  //   }
  // }, [token]);

  if (token) {
    setTimeout(() => navigate("/doctor-dashboard"), 1000);

    return <div className="reroute-message">Please logout to access!</div>;
  } else {
    return (
      <div id="login">
        <LoginForm />
      </div>
    );
  }
}
