import "../Style/RegisterForm.css";
import React, { useState } from "react";

import axios from "axios";

const base_uri = "http://localhost:5000";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //submission logic

    // Todo: Validation
    const data = {
      firstname: firstName,
      lastname: lastName,
      email,
      username,
      password,
    };
    axios
      .post(base_uri + "/users/signup", data)
      .then((res) => {
        if (res.status === 200) {
          console.log("Successfully registered!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <label htmlFor="firstName" className="f1">
            First Name
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            placeholder="Enter Your Firstname"
            type="text"
            className="form-control"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="l1">
            Last Name
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            placeholder="Enter Your Lastname"
            type="text"
            className="form-control"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="e1">
            Email
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
            <br></br>
          </label>
          <input
            placeholder="Enter Your EmailId"
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="u1">
            Username
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
            <br></br>
          </label>
          <input
            placeholder="Enter Your Username"
            type="text"
            className="form-control"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="p1">
            Password
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
            <br></br>
          </label>
          <input
            placeholder="Enter Your Password"
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="p2">
            Confirm Password
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
            <br></br>
          </label>
          <input
            placeholder="Confirm Your Password"
            type="password"
            className="form-control"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
