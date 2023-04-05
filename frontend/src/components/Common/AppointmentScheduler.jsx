import React, { useState } from "react";
// import DatePicker from './DatePicker';
// import TimeSlots from './TimeSlots';
import "../Style/AppointmentScheduler.css";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState("March 1");
  const [selectedTime, setSelectedTime] = useState("");
  const [tokenNo, setTokenNo] = useState("");

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    // generate random token number
    setTokenNo(Math.floor(Math.random() * 1000000));
  };

  return (
    <div className="appointmentSchedulerContainer">
      <h2>Appointment Scheduler</h2>
      <div className="appointmentSelectionContainer">
        <div>
          <h3>Selected Date:</h3>
          <p>{selectedDate}</p>
        </div>
        <div>
          <h3>Selected Time:</h3>
          <p>{selectedTime}</p>
        </div>
        <div>
          <h3>Token No:</h3>
          <p>{tokenNo}</p>
        </div>
      </div>
      <div className="dateTimeSelectionContainer">
        {/* <DatePicker onDateSelection={handleDateSelection} /> */}
        {/* <TimeSlots onTimeSelection={handleTimeSelection} /> */}
      </div>
    </div>
  );
};

export default AppointmentScheduler;
