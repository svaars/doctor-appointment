import "../../Style/RegisterForm.css";
import React, { useContext, useState } from "react";

import axios from "axios";

import { Alert } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router";

const base_uri = "http://localhost:5000";

const RegisterForm = ({ userType }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success message
  const [success, setSuccess] = useState(false);

  // Error message
  const [errorMessage, setErrorMessage] = useState(null);

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    //submission logic

    setErrorMessage(null);

    // Todo: Validation
    const data = {
      firstname: firstName,
      lastname: lastName,
      email,
      username,
      password,
      usertype: userType || "user",
    };
    axios
      .post(base_uri + "/users/signup", data, { withCredentials: true })
      .then((res) => {
        setIsSubmitting(false);

        if (res.status === 200) {
          // Register success

          setSuccess(true);
          // Load the token to context
          setToken(res.data.token);
          // Redirect to next dashboard
          if (userType == "doctor") navigate("/doctor-dashboard");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);

        const data = err.response.data;
        if (data.more.message) {
          setErrorMessage(data.more.message);
        } else {
          setErrorMessage("Unknown");
        }
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
      <form onSubmit={handleSubmit}>
        {success && (
          <Alert
            message="Successfully registered!"
            type="success"
            style={{ maxWidth: "400px", margin: "auto" }}
          />
        )}

        {errorMessage && (
          <Alert
            message="Could not register user!"
            description={errorMessage}
            type="error"
            style={{ maxWidth: "400px", margin: "auto" }}
          />
        )}

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
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? <>Registering</> : <>Register</>}
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
