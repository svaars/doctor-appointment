import React from "react";

import { ReactComponent as SVGDoctor } from "../../images/signup_as_doctor.svg";
import { ReactComponent as SVGPatient } from "../../images/signup_as_patient.svg";

import "../Style/SignUpOption.scss";
import { Link } from "react-router-dom";

export default function SignUpOption() {
  return (
    <div id="signup-option">
      <Link to={"/doctor/signup"} id="signup-doctor" className="signup-card">
        <div className="svg-wrapper">
          <SVGDoctor />
        </div>
        <h4>Sign up as a doctor</h4>
      </Link>
      <Link to={"/patient/signup"} id="signup-patient" className="signup-card">
        <div className="svg-wrapper">
          <SVGPatient />
        </div>
        <h4>Sign up as a patient</h4>
      </Link>
    </div>
  );
}
