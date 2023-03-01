import '../Style/RegisterForm.css';
import React, { useState } from "react";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name<span className="star2" style={{color: "red"}}>*</span></label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name<span className="star2" style={{color: "red"}}>*</span></label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email<span className="star2" style={{color: "red"}}>*</span><br></br></label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username<span className="star2" style={{color: "red"}}>*</span><br></br></label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password<span className="star2" style={{color: "red"}}>*</span><br></br></label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password<span className="star2" style={{color: "red"}}>*</span><br></br></label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div><br></br>
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
      </form>
    </div>
  );
};

export default RegisterForm;
