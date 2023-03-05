import logo from './logo.svg';
import './App.css'
import Button from './components/Button';
import Input from './components/Input';
import DoctorCard from './components/DoctorCard';
import DoctorAvailability from './components/DoctorAvailability';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
import DatePicker from './components/DatePicker';



function App() {
    const handleInputChange = (value) => {
    console.log('Input value is:', value);
  }
  return (
    <>
      <div>
        <DatePicker />
      </div>  
     {/* <div className="App">
      <RegisterForm />
    </div>  */}
    {/* <div className="App">
      <LoginForm />
    </div>  */}
       <div>
      <DoctorAvailability
        image="https://"
        name="Dr. lorem"
        timeSlot="10:00 am - 11:00 am"
        availabilityImage="https://"
        availableSlots="25"
        instructions="Click the button below to book your appointment"
      />
    </div> 
       {/* <div>
        <DoctorCard
          image="https://cdn.pixabay.com/photo/2016/09/28/02/35/doctor-1699656__340.jpg"
          name="Dr. lorem"
          rating="4.8"
          approval="95"
          yearsOfExperience="25"
          location="MUMBAI, MY"
        />
      </div>  */}
    {/* <div>
      <form>
        <Input type="text" placeholder="Enter your name" onChange={handleInputChange} />
        <Input type="password" placeholder="Enter your password" />
      </form>
    </div>
    <div>
        <Button>Small Button</Button>
        <Button size="large">Large Button</Button>
    </div>  */}
    </>
  );
}

export default App;

