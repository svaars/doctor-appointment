import { Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";

// App function

function App() {
  return (
    <div id="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
