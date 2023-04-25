import { Button, Card, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "../../Common/DatePicker";
import AddSession from "../Modals/AddSession";
import { getSession } from "../../../services/session";

import {
  ClockCircleOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "../../Style/Schedule.scss";

function SessionComponent({ session }) {
  return (
    <div className="session">
      <div className="name">{session.name}</div>
      <div className="details">
        <div className="time">
          <ClockCircleOutlined />
          <div className="from">
            {new Date(session.fromTime).toLocaleString("en-us", {
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          -
          <div className="to">
            {new Date(session.toTime).toLocaleString("en-us", {
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
        <div className="maxPatients">
          <UserOutlined />
          <div className="number">{session.maxPatients}</div>
        </div>
        <div className="bookedPatients">
          <UserAddOutlined />
          <div className="number">{session.appointments.length || 0}</div>
        </div>
      </div>
      {/* <div className="buttons">
        <Button>Edit</Button>
        <Button danger>Cancel</Button>
      </div> */}
    </div>
  );
}

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState(null);

  const [addingSession, setAddingSession] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);

  const onChangeDate = (direction) => {
    direction === "left"
      ? setSelectedDate((prev) => {
          const next = new Date(prev);
          next.setDate(prev.getDate() - 1);
          return next;
        })
      : setSelectedDate((prev) => {
          const next = new Date(prev);
          next.setDate(prev.getDate() + 1);
          return next;
        });
    // generate new array of dates to be shown in scroll bar
  };

  const onSessionAdd = (session) => {
    setSessions((prev) => {
      if (!prev) {
        return [session];
      }
      return [session, ...prev];
    });
    setAddingSession(false);
  };

  useEffect(() => {
    setLoadingSession(true);
    getSession(selectedDate)
      .then((res) => {
        setSessions(res.data.sessions);
      })
      .finally(() => setLoadingSession(false));
  }, [selectedDate]);

  return (
    <div id="schedule-view" style={{ padding: "20px" }}>
      {addingSession && (
        <AddSession
          onSessionCreated={onSessionAdd}
          open={addingSession}
          onCancel={() => {
            setAddingSession(false);
          }}
          date={selectedDate}
        />
      )}
      <DatePicker date={selectedDate} onChangeDate={onChangeDate} />
      <Card id="sessions">
        <h2>Sessions</h2>
        <Button
          type="primary"
          onClick={() => {
            setAddingSession(true);
          }}
        >
          Add session
        </Button>
        {loadingSession ? (
          <Spin spinning />
        ) : (
          <div id="sessions-list">
            {sessions &&
              sessions.length > 0 &&
              sessions.map((session) => {
                return <SessionComponent session={session} />;
              })}
            {sessions && sessions.length === 0 && (
              <>No sessions scheduled yet!</>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
