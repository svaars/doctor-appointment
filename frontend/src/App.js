import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import DoctorCard from "./components/DoctorCard";
import DoctorAvailability from "./components/DoctorAvailability";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorRegisterSecondPhase from "./components/Forms/DoctorRegisterSecondPhase";

function App() {
  const handleInputChange = (value) => {
    console.log("Input value is:", value);
  };
  return (
    <>
      <div className="App">
        {/* <DoctorDashboard /> */}
        {/* <DoctorRegisterSecondPhase /> */}
        <RegisterForm />
      </div>
    </>
  );
}

export default App;
