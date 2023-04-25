import React, { useContext } from "react";
import DoctorRegisterForm from "../components/Doctor/Forms/DoctorRegisterForm";
import { AuthContext } from "../context/AuthContext";

import HomeNavbar from "../components/Common/HomeNavbar";

import "./Style/DoctorRegister.scss";

export default function DoctorRegister() {
  const { token } = useContext(AuthContext);
  if (token) {
    return (
      <div id="doctor-register-page" className="register-page">
        <h1>Logout to access!</h1>
      </div>
    );
  }
  return (
    <div id="doctor-register-page" className="register-page">
      <HomeNavbar />
      <h1>Register as Doctor</h1>
      <DoctorRegisterForm />
    </div>
  );
}
