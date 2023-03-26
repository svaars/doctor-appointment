import { Button, Card } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import DatePicker from "../../DatePicker";
import AddSession from "../Modals/AddSession";

const base_uri = process.env.REACT_APP_API_URI;
export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState(null);

  const [addingSession, setAddingSession] = useState(false);

  const { token } = useContext(AuthContext);

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

  useEffect(() => {
    axios
      .get(base_uri + "/doctors/sessions", {
        headers: { Authorization: token },
        data: { date: selectedDate },
      })
      .then((res) => {
        console.log(res);
      });
  }, [selectedDate]);

  return (
    <div id="schedule-view" style={{ padding: "20px" }}>
      <AddSession
        open={addingSession}
        onCancel={() => {
          setAddingSession(false);
        }}
        session={{
          name: "Old A",
          from: new Date().getTime(),
          to: new Date().getTime(),
          maxAllowed: 25,
        }}
      />
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
        <div id="sessions-list"></div>
      </Card>
    </div>
  );
}
