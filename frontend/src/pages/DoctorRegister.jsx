import React, { useContext } from "react";
import DoctorRegisterForm from "../components/Forms/DoctorRegisterForm";
import { AuthContext } from "../context/AuthContext";

export default function DoctorRegister() {
  const { token } = useContext(AuthContext);
  if (token) {
    return (
      <div id="doctor-register-page">
        <h1>Logout to access!</h1>
      </div>
    );
  }
  return (
    <div id="doctor-register-page">
      <h1>Register as Doctor</h1>
      <DoctorRegisterForm />
    </div>
  );
}
