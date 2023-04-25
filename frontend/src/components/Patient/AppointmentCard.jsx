import { Card } from "antd";
import React from "react";
import ProfileImage from "../Common/ProfileImage";

import dayjs from "dayjs";

import "../Style/AppointmentCard.scss";

import { ClockCircleOutlined, ContactsOutlined } from "@ant-design/icons";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function AppointmentCard({ session }) {
  if (!session || !session.doctor) {
    return <>Some error has prevented from showing this appointment</>;
  }

  return (
    <Card className="appointment-card-wrapper">
      <div className="appointment-card">
        <div className="doctor">
          <div className="image">
            <ProfileImage />
          </div>
          <div className="desc-details">
            <div className="name">
              Dr. {session.doctor.firstname} {session.doctor.lastname}
            </div>
            <div className="specialization">
              {session.doctor.doctorData.specialization}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="time">
            <ClockCircleOutlined />
            <div className="time-text">
              {new dayjs(session.fromTime).format("hh:mm A")} -{" "}
              {new dayjs(session.toTime).format("hh:mm A")}
            </div>
          </div>
          <div className="date">
            {new dayjs(session.date)
              .hour(new dayjs(session.fromTime).hour())
              .minute(new dayjs(session.fromTime).minute())
              .format("DD/MM/YYYY")}
          </div>
          <div className="ticket-no">
            <ContactsOutlined /> #
            {session && session.appointments && session.appointments.tokenNo}
          </div>
        </div>
      </div>
    </Card>
  );
}
