import { Button, Card } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import DatePicker from "../../DatePicker";
import AddSession from "../Modals/AddSession";
import { getSession } from "../../../services/session";

const base_uri = process.env.REACT_APP_API_URI;
export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState(null);

  const [addingSession, setAddingSession] = useState(false);


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

  const onSessionAdd = (session)=>{
    setSessions(prev=>{
      if(!prev){
        return [session]
      }
      return [session, ...prev];
    })
    setAddingSession(false)
  }

  useEffect(() => {
    getSession().then(res=>{
      
        setSessions(res.data.sessions)
      
    })
  }, [selectedDate]);

  return (
    <div id="schedule-view" style={{ padding: "20px" }}>
      {addingSession&&(<AddSession
        onSessionCreated={onSessionAdd}
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
        date={selectedDate}
        
      />)}
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
        <div id="sessions-list">
          {sessions&&sessions.length>0&&sessions.map(session=>{
            return (<>{JSON.stringify(session)}</>)
          })}
        </div>
      </Card>
    </div>
  );
}
