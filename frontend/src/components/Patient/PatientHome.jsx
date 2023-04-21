import React, { useEffect } from "react";
import SearchBar from "./SearchBar";

import "../Style/PatientHome.scss";
import { Link } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import FilterBox from "./FilterBox";

export default function PatientHome() {
  const FAST_SEARCH_OPTIONS = [
    {
      color: "#A2C7E2",
      label: "General",
    },
    {
      color: "#B2E7A9",
      label: "Pediatrician",
    },
    {
      color: "#E7A17A",
      label: "Dermatology",
    },
  ];
  return (
    <section id="patient-home">
      {/* <SearchBar/> */}
      <FilterBox />
      <div className="fast-search-box-list">
        {FAST_SEARCH_OPTIONS.map((opt) => (
          <FastSearchBoxCard color={opt.color} label={opt.label} />
        ))}
      </div>
      <UpcomingAppointments />
      {/* <div id="previous-appoinments">Previous appointments</div> */}
    </section>
  );
}

const FastSearchBoxCard = ({ color, label }) => {
  return (
    <Link
      to={"./search?term=" + label}
      className="fsb-card"
      style={{ backgroundColor: color }}
    >
      {label}
    </Link>
  );
};

const UpcomingAppointments = () => {
  useEffect(() => {});
  return (
    <section id="upcoming-appointments">
      <h3>Upcoming appointments</h3>
      <DoctorCard />
    </section>
  );
};
