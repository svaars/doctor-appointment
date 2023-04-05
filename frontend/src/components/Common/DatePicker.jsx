import React from "react";
import "../Style/DatePicker.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card } from "antd";

const AddDay = (date, day) => {
  const d = new Date(date);
  d.setDate(d.getDate() + day);
  return d;
};

const DatePicker = ({ date, onChangeDate }) => {
  return (
    <div className="date-picker-wrapper">
      <div className="date-picker-year">{date.getFullYear()}</div>
      <div className="date-picker-date">
        <button
          className="date-picker-left"
          onClick={() => onChangeDate("left")}
        >
          <LeftOutlined />
        </button>
        <div className="date-picker-scroll">
          <DateCard date={AddDay(date, -2)} />
          <DateCard date={AddDay(date, -1)} />
          <DateCard date={date} selected />
          <DateCard date={AddDay(date, 1)} />
          <DateCard date={AddDay(date, 2)} />
        </div>
        {/* right arrow button */}
        <button
          className="date-picker-right"
          onClick={() => onChangeDate("right")}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

function DateCard({ date, selected = false }) {
  return (
    <div className="date-card-wrapper">
      <Card style={{ opacity: selected ? "1" : ".6" }}>
        <div id="date-month">
          {date.toLocaleString("default", { month: "short" })}
        </div>
        <div id="date-day">{date.getDate()}</div>
      </Card>
    </div>
  );
}

export default DatePicker;
