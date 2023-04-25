import { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { ConfigProvider } from "antd";

// App function

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div id="spinner">Loading...</div>;
  }

  return (
    <div id="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#219f94",
            colorInfo: "#219f94",
            borderRadius: 4,
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </div>
  );
}

export default App;
