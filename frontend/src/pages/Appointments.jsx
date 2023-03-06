import React from "react";

import "./Style/Appointments.css";

import Search from "antd/es/transfer/search";
import { Button, Card } from "antd";

import ProfileImage from "../components/ProfileImage";

export default function Appointments() {
  return (
    <div id="appointments">
      <Card className="appointment-head-card">
        <h3>Today, you have 18 Bookings across 4 different sessions</h3>
      </Card>
      <div className="search">
        <Search />
      </div>

      <div className="sessions-list">
        {/* Session Card */}
        <SessionCard />
        <SessionCard />
        <SessionCard />
      </div>
    </div>
  );
}

function SessionUserCard() {
  return (
    <div className="session-user-card">
      <div className="profile-details">
        <ProfileImage />
        <div className="group">
          <div className="user-name">John Doe</div>
          <div className="token-no">Token #1</div>
        </div>
      </div>
      <div className="action-buttons">
        <Button type="primary">Write report</Button>
        <Button>View history</Button>
      </div>
    </div>
  );
}

function SessionCard() {
  return (
    <div className="session-card">
      <Card>
        <div className="session-header">
          <div className="session-title">Session #1</div>
          <Button danger>Cancel</Button>
        </div>
        <div className="session-user-list">
          <SessionUserCard />
          <SessionUserCard />
          <SessionUserCard />
        </div>
      </Card>
    </div>
  );
}
