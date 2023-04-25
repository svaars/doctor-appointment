import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBox from "./FilterBox";
import { Spin } from "antd";
import { SearchDoctors } from "../../services/doctor";
import DoctorCard from "../Patient/DoctorCard";

import "../Style/PatientSearch.scss";
export default function PatientSearch() {
  const [queries] = useSearchParams();

  const [results, setResults] = useState(null);

  useEffect(() => {
    const term = queries.get("term");
    const location = queries.get("location");
    const date = new Date(queries.get("date"));

    SearchDoctors({ term, location, date }).then((res) => setResults(res));
  }, [queries]);

  return (
    <div id="patient-search">
      <FilterBox
        initTerm={queries.get("term")}
        initLocation={queries.get("location")}
        initDate={queries.get("date")}
      />
      <div className="search-list">
        <h3>Results</h3>
        {results === null ? (
          <Spin spinning />
        ) : results.length == 0 ? (
          <>No results!</>
        ) : (
          results.map((res) => <DoctorCard doctor={res} />)
        )}
      </div>
    </div>
  );
}
