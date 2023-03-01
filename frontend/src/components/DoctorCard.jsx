import React from 'react';

function DoctorCard(props) {
  return (
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img src={props.image} alt={props.name} className="doctor-image" />
      </div>
      <div className="doctor-details">
        <h2 className="doctor-name">{props.name}</h2>
        <div className="doctor-ratings">
          <div className="doctor-stars">{props.rating} stars</div>
          <div className="doctor-approval">{props.approval}% approval</div>
        </div>
        <div className="doctor-experience">{props.yearsOfExperience} years of experience</div>
        <div className="doctor-location">{props.location}</div>
        <button className="book-button">Book now</button>
      </div>
    </div>
  );
}

export default DoctorCard;
