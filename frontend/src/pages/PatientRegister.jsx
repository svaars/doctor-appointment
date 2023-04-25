import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PatientRegisterForm from "../components/Patient/Forms/PatientRegisterForm";
import HomeNavbar from "../components/Common/HomeNavbar";

export default function PatientRegister() {
  const { token } = useContext(AuthContext);
  if (token) {
    return (
      <div id="patient-register-page" className="register-page">
        <HomeNavbar />
        <h1>Logout to access!</h1>
      </div>
    );
  }
  return (
    <div id="patient-register-page" className="register-page">
      <HomeNavbar />
      <h1>Register as Patient</h1>
      <PatientRegisterForm />
    </div>
  );
}
