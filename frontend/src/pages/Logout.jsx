import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const conf = window.confirm("Are you sure you want to logout?");
    if (conf) {
      logout();
    }
  }, []);
  return <div id="logout-page"></div>;
}
