import React, { useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";

import "../Style/FilterBox.scss";
import { Button, DatePicker, Input, Select } from "antd";
import { GetAllCities } from "../../services/general";
import { toTitleCase } from "../../utils/constants/common";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function FilterBox({
  showTitle = true,
  initTerm,
  initLocation,
  initDate,
}) {
  const [term, setTerm] = useState(initTerm || "");
  const [location, setLocation] = useState(initLocation || "");
  const [selectedDate, setSelectedDate] = useState(
    initDate ? new dayjs(initDate) : null
  );

  const [locationOptions, setLocationOptions] = useState(null);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(
      `/patient/app/search?${
        term != "" ? `term=${encodeURIComponent(term)}` : ""
      }${location && `&location=${encodeURIComponent(location)}`}${
        selectedDate
          ? `&date=${encodeURIComponent(selectedDate.toString())}`
          : ""
      }`
    );
  };

  useEffect(() => {
    GetAllCities().then((res) => {
      let options = res.data;
      options = options.map((opt) => {
        return {
          label: toTitleCase(opt),
          value: opt,
        };
      });
      setLocationOptions(options);
    });
  }, []);

  return (
    <div className="filter-box">
      {showTitle && <h3>Search</h3>}
      <div id="keyword">
        <SearchOutlined />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type="search"
          placeholder="Find a doctor or speciality..."
        />
      </div>
      <div id="location">
        {locationOptions ? (
          <Select
            placeholder="Location"
            options={locationOptions}
            value={locationOptions.find((opt) => opt.value == location)}
            onChange={(e) => {
              setLocation(e);
            }}
          />
        ) : (
          <Select placeholder="Location" disabled></Select>
        )}
      </div>
      {/* <div id="filter-tools">
        <DatePicker
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
        />
      </div> */}
      <Button type="primary" block id="search-btn" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
