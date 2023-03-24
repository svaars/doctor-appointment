import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Appointments from "./Appointments";
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

export default function DoctorDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("appointments");

  const { token, verifyUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const DisplaySelectedContent = () => {
    switch (selected) {
      case "appointments":
        return <Appointments />;
      default:
        return <>Todo</>;
    }
  };

  useEffect(() => {
    // If token is not available ask the user to login
    if (!token) {
      navigate("/login");
    }
  }, [token]);

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
