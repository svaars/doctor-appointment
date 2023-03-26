import React from "react";
import { Outlet } from "react-router-dom";

export default function Doctor() {
  return (
    <div className="doctor-app">
      <Outlet />
    </div>
  );
}
