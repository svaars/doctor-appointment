import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/Common/Forms/LoginForm";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { token } = useContext(AuthContext);

  if (token) {
    return <div className="reroute-message">You are already logged in!</div>;
  } else {
    return (
      <div id="login">
        <LoginForm />
      </div>
    );
  }
}
