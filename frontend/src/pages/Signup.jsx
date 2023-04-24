import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SignUpOption from "../components/Common/SignUpOption";
import HomeNavbar from "../components/Common/HomeNavbar";

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

  if (token) {
    return <div className="reroute-message">Please logout to access!</div>;
  }

  return (
    <div id="signup-page" style={{ padding: "0px 64px" }}>
      <HomeNavbar />
      <SignUpOption />
    </div>
  );
}
