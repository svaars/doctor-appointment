import { Button } from "antd";
import React from "react";
import { EnvironmentFilled } from "@ant-design/icons";

import ProfileImage from "../Common/ProfileImage";
import { useNavigate } from "react-router-dom";

import "../Style/DoctorCard.scss";

export default function DoctorCard({ doctor, hideBooking = false }) {
  const navigator = useNavigate();
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
              <EnvironmentFilled color="#E14D2A" />
            </span>
            <span>
              {doctor.doctorData.clinic.clinicName},{" "}
              {doctor.doctorData.clinic.street}, {doctor.doctorData.clinic.city}
              , {doctor.doctorData.clinic.state},{" "}
              {doctor.doctorData.clinic.pincode}
            </span>
          </div>
        </div>
        {!hideBooking && (
          <Button
            type="primary"
            onClick={() => {
              navigator(`/patient/app/book/${doctor._id}`);
            }}
          >
            Book
          </Button>
        )}
      </div>
    );
  }
}
