import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
// import AppointmentScheduler from "./components/AppointmentScheduler";
import DoctorAvailability from "./components/DoctorAvailability";
import DoctorCard from "./components/DoctorCard";
import DatePicker from "./components/DatePicker";
  // import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<AppointmentScheduler />} /> */}
          <Route path="DoctorAvailibility" element={<DoctorAvailability />} />
          <Route path="DoctorCard" element={<DoctorCard />} />
          <Route path="*" element={<>No page</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));