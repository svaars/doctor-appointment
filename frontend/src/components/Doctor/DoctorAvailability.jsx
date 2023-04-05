import React from 'react';

function DoctorAvailability(props) {
  return (
    <div className="doctor-availability">
      <div className="doctor-image-container">
        <img src={props.image} alt={props.name} className="doctor-image" />
      </div>
      <div className="doctor-details">
        <h2 className="doctor-name">{props.name}</h2>
        <div className="doctor-time-slot">{props.timeSlot} Today</div>
        <div className="doctor-availability-details">
          <img src={props.availabilityImage} alt="Availability" className="availability-image" />
          <div className="availability-count">{props.availableSlots} available slots</div>
        </div>
        <div className="doctor-instructions">{props.instructions}</div>
      </div>
    </div>
  );
}

export default DoctorAvailability;
