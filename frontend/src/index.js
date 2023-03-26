import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import Signup from "./pages/Signup";
import DoctorRegister from "./pages/DoctorRegister";
import Login from "./pages/Login";
import AuthContextComponent from "./context/AuthContext";
import Doctor from "./pages/Doctor";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextComponent>
        <App />
      </AuthContextComponent>
    ),
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/doctor/signup",
        element: <DoctorRegister />,
      },
      {
        path: "/doctor/app",
        element: <DoctorDashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
