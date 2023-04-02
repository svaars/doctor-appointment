import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Spin } from "antd";
import Appointments from "../components/Doctor/View/Appointments";
import axios from "axios";
import Schedule from "../components/Doctor/View/Schedule";
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
  getItem("Reports", "reports", <FileOutlined />),
  getItem("Records", "records", <UserOutlined />),
];

const base_uri = process.env.REACT_APP_API_URI;

export default function DoctorDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("appointments");

  const [loading, setLoading] = useState(true);

  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const { token } = useContext(AuthContext);

  const DisplaySelectedContent = () => {
    switch (selected) {
      case "appointments":
        return <Appointments />;
      case "schedule":
        return <Schedule />;
      default:
        return <>Todo</>;
    }
  };

  const getUser = () => {
    axios
      .get(base_uri + "/users/me", {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        setNotLoggedIn(false);
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
    // verifyUser();
    getUser();
  });

  if (loading) {
    return <Spin />;
  }

  if (notLoggedIn) {
    return <>Unauthorized</>;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
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
