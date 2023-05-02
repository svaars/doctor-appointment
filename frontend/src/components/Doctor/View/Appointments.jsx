import React, { useEffect, useState } from "react";

import "../../Style/Appointments.css";

import Search from "antd/es/transfer/search";
import { Button, Card } from "antd";

import ProfileImage from "../../Common/ProfileImage";
import { getSession } from "../../../services/session";

export default function Appointments() {
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    getSession(new Date(), { doctor: false, appointments: true }).then(
      (res) => {
        if (res.status === 200) {
          console.log(res.data.sessions);
          setSessions(res.data.sessions);
        }
      }
    );
  }, []);
  return (
    <div id="appointments">
      <Card className="appointment-head-card">
        <h3>
          Today, you have{" "}
          {sessions &&
            (sessions.length > 0
              ? sessions
                  .map((s) => s.appointments.length)
                  .reduce((a, b) => a + b)
              : 0)}{" "}
          Bookings across {sessions && sessions.length} different sessions
        </h3>
      </Card>
      {/* <div className="search">
        <Search />
      </div> */}

      <div className="sessions-list">
        {/* Session Card */}
        {sessions &&
          sessions.map((session, idx) => {
            return <SessionCard key={idx} session={session} />;
          })}
      </div>
    </div>
  );
}

function SessionUserCard({ appointment }) {
  return (
    <div className="session-user-card">
      <div className="profile-details">
        <ProfileImage />
        <div className="group">
          <div className="user-name">
            {appointment.user.firstname} {appointment.user.lastname}
          </div>
          <div className="token-no">Token #{appointment.tokenNo}</div>
        </div>
      </div>
      <div className="action-buttons">
        <Button
          type="primary"
          href={"/doctor/app/report/" + appointment.user._id}
        >
          Write report
        </Button>
        {/* <Button>View history</Button> */}
      </div>
    </div>
  );
}

function SessionCard({ session }) {
  return (
    <div className="session-card">
      <Card>
        <div className="session-header">
          <div className="session-title">{session.name}</div>
        </div>
        <div className="session-user-list">
          {session.appointments.map((appointment, idx) => {
            return <SessionUserCard key={idx} appointment={appointment} />;
          })}
          {session.appointments.length === 0 && <>No appointments yet!</>}
        </div>
      </Card>
    </div>
  );
}
