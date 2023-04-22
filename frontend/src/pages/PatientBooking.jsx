import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorCard from "../components/Patient/DoctorCard";
import { GetDoctor, GetSessions } from "../services/doctor";
// import DatePicker from "../components/Common/DatePicker";

import "./Style/PatientBooking.scss";

import dayjs from "dayjs";
import { Button, Card, DatePicker, notification } from "antd";
import { bookSession } from "../services/session";

export default function PatientBooking() {
  const navigate = useNavigate();

  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [date, setDate] = useState(new dayjs());

  const [isBooking, setIsBooking] = useState(false);

  const onSessionSelect = (ses) => {
    setSelectedSession(ses);
  };

  const onConfirmBooking = () => {
    setIsBooking(true);
    bookSession(selectedSession._id)
      .then((success) => {
        if (success) {
          navigate("/patient/app");
        }
      })
      .finally(() => {
        setIsBooking(false);
      });
  };

  useEffect(() => {
    GetDoctor(params.id).then((data) => setDoctor(data));
  }, []);

  useEffect(() => {
    GetSessions(params.id, date.toDate()).then((res) => {
      console.log(res);
      setSelectedSession(null);
      setSessions(res);
    });
  }, [date, params]);
  return (
    <div id="patient-booking">
      {doctor && <DoctorCard doctor={doctor} hideBooking />}
      {/* <DatePicker date={date} onChangeDate={(e) => setDate()} /> */}
      <DatePicker
        defaultValue={new dayjs()}
        format={"DD-MM-YYYY"}
        size="large"
        style={{ width: "100%" }}
        value={date}
        onChange={(d) => setDate(d)}
      />
      <Card>
        <SessionSelector
          sessions={sessions}
          onSelectHandler={onSessionSelect}
        />
      </Card>

      {selectedSession && (
        <Card>
          <h3>Selected</h3>
          <div className="selected-details">
            <div id="time">
              Time: {new dayjs(selectedSession.fromTime).format("h:mm A")} -{" "}
              {new dayjs(selectedSession.toTime).format("h:mm A")}
            </div>
            <div id="date">
              Date: {new Date(selectedSession.date).toDateString()}
            </div>
            <div id="token-no">
              Token no. : #{selectedSession.appointments.length}
            </div>
            <div className="token-warning">Token number may vary</div>
          </div>
        </Card>
      )}
      {selectedSession && (
        <Button type="primary" onClick={onConfirmBooking} loading={isBooking}>
          Confirm booking
        </Button>
      )}
    </div>
  );
}

const SessionSelector = ({ sessions, onSelectHandler }) => {
  const [selected, setSelected] = useState();
  return (
    <div className="session-selector">
      {sessions &&
        sessions.length > 0 &&
        sessions.map((ses, i) => {
          return (
            <div
              key={i}
              className={
                "session-time-button" + (selected == ses._id ? " active" : "")
              }
              onClick={() => {
                setSelected(ses._id);
                onSelectHandler(ses);
              }}
            >
              {new dayjs(ses.fromTime).format("h:mm A")} -{" "}
              {new dayjs(ses.toTime).format("h:mm A")}
            </div>
          );
        })}
      {!sessions || (sessions.length == 0 && <>No sessions available!</>)}
    </div>
  );
};
