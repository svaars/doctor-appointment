import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/Common/Forms/LoginForm";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { server_uri } from "../utils/constants/config";
import { Spin } from "antd";
import HomeNavbar from "../components/Common/HomeNavbar";

import "./Style/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get(server_uri + "/users/me")
      .then((res) => {
        if (res.status == 200) {
          setLoggedIn(true);
          setTimeout(() => {
            navigate("/" + res.data.userType + "/app");
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setLoggedIn(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spin spinning className="loading-spin" />;
  } else if (loggedIn) {
    return (
      <div className="reroute-message">
        You are already logged in! Redirecting to your dashboard!
      </div>
    );
  } else if (!loggedIn) {
    return (
      <div id="login">
        <HomeNavbar />
        <LoginForm />
      </div>
    );
  }
}
