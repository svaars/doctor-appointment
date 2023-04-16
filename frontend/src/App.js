import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./Navbar";

// App function

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div id="spinner">Loading...</div>;
  }

  return (
    <div id="App">
      <Outlet />
    </div>
  );
}

export default App;
