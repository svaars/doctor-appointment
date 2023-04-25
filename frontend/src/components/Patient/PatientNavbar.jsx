import React, { useContext, useState } from "react";
import ProfileImage from "../Common/ProfileImage";

import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "../Style/PatientNavbar.scss";
import { Button } from "antd";
import { AuthContext } from "../../context/AuthContext";

import dayjs from "dayjs";
function getGreet(date) {
  const hour = Number(date.format("H"));
  // const day = date.day()

  const splitAfternoon = 12; //24hr time to split the afternoon
  const splitEvening = 18; //24hr time to split the evening

  const isMorning = 5 <= hour && hour < splitAfternoon;
  const isAfternoon = splitAfternoon <= hour && hour < splitEvening;

  // const isFridayAfternoon = day === 5 && (isAfternoon || isEvening)
  // const isSaturdayMorning = day === 6 && isMorning

  // if (isFridayAfternoon || isSaturdayMorning) {
  //     return 'Have a good weekend';
  //   } else
  if (isMorning) {
    return "Good morning";
  } else if (isAfternoon) {
    return "Good afternoon";
  }

  return "Good evening";
}

export default function PatientNavbar({ username }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const { logout } = useContext(AuthContext);

  return (
    <nav id="patient-nav">
      <div className="left">
        <ProfileImage />
        <div className="stack">
          <span id="greeting">{getGreet(new dayjs())},</span>
          <span id="username">{username}</span>
        </div>
      </div>
      <div className="right">
        <MenuOutlined onClick={() => setMenuOpened((prev) => !prev)} />
      </div>
      {menuOpened && (
        <div id="menu">
          <div id="top-control">
            <CloseOutlined onClick={() => setMenuOpened(false)} />
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/patient/app">Dashboard</Link>
            </li>

            <li>
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      )}
      {menuOpened && (
        <div id="backdrop" onClick={() => setMenuOpened(false)}></div>
      )}
    </nav>
  );
}
