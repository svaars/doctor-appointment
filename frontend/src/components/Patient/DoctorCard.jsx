import { Button } from "antd";
import "../Style/DoctorCard.scss";
import React from "react";
import { EnvironmentFilled } from "@ant-design/icons";

import ProfileImage from "../Common/ProfileImage";

export default function DoctorCard({ doctor }) {
  if (!doctor) {
    return <></>;
  } else {
    return (
      <div className="doctor-card">
        <div className="header">
          <ProfileImage />

          <div className="text">
            <div className="doctor-name">
              Dr. {doctor.firstname} {doctor.lastname}
            </div>
            <div className="doctor-speciality">
              {doctor.doctorData.specialization}
            </div>
          </div>
        </div>
        <div className="doctor-details">
          <div className="clinic-address">
            <span className="icon">
              <EnvironmentFilled />
            </span>
            <span>
              {doctor.doctorData.clinic.clinicName},{" "}
              {doctor.doctorData.clinic.street}, {doctor.doctorData.clinic.city}
              , {doctor.doctorData.clinic.state},{" "}
              {doctor.doctorData.clinic.pincode}
            </span>
          </div>
        </div>
        <Button type="primary">Book</Button>
      </div>
    );
  }
}
