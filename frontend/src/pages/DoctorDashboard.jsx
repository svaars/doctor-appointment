import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  ScheduleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Spin } from "antd";
import Appointments from "../components/Doctor/View/Appointments";
import axios from "axios";
import Schedule from "../components/Doctor/View/Schedule";
import { server_uri } from "../utils/constants/config";
import ProfileImage from "../components/Common/ProfileImage";
import "./Style/DoctorDashboard.scss";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Appointments", "appointments", <HomeOutlined />),
  getItem("Schedule", "schedule", <ScheduleOutlined />),
  // getItem("Reports", "reports", <FileOutlined />),
  // getItem("Clinical notes", "clinical-notes", <UserOutlined />),
  getItem("Logout", "logout", <LogoutOutlined />),
];

export default function DoctorDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("appointments");

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const { token, logout } = useContext(AuthContext);

  const DisplaySelectedContent = () => {
    switch (selected) {
      case "appointments":
        return <Appointments />;
      case "schedule":
        return <Schedule />;
      case "logout":
        logout();
        break;
      default:
        return <>Todo</>;
    }
  };

  const getUser = () => {
    axios
      .get(server_uri + "/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.userType == "doctor") {
          setNotLoggedIn(false);
          setUser(res.data);
        }
      })
      .catch((err) => {
        // if(err)
        if (err.response.status === 401) {
          setNotLoggedIn(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Spin />;
  } else if (notLoggedIn) {
    return <>Unauthorized</>;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider
      id="doctor-dashboard"
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div
          className={`doctor-profile-details ${collapsed ? "collapsed" : ""}`}
        >
          <ProfileImage />
          <div id="username">
            Dr. {user.firstname} {user.lastname}
          </div>
          <div id="specialization">{user.doctorData.specialization}</div>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["appointments"]}
          mode="inline"
          items={items}
          style={{ textAlign: "left" }}
          onSelect={(e) => setSelected(e.key)}
          selectedKeys={selected}
        />
      </Sider>
      <Layout className="site-layout">
        <Content>{DisplaySelectedContent()}</Content>
      </Layout>
    </Layout>
  );
}
