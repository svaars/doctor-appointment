import "../../Style/LoginForm.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { server_uri } from "../../../utils/constants/config";


const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic

    setIsSubmitting(false);

    setErrorMessage(null);
    // Todo: Validation
    const data = {
      username,
      password,
    };
    axios
      .post(server_uri + "/users/login", data, { withCredentials: true })
      .then((res) => {
        setIsSubmitting(false);
        if (res.status === 200) {
          // Register success

          setErrorMessage(null);
          setSuccess(true);
          // Load the token to context
          setToken(res.data.token);
          if(res.data.userType === "doctor")
            navigate("/doctor/app");
          else if(res.data.userType === "patient")
            navigate("/patient/app");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setSuccess(false);
        if (err.response) {
          const data = err.response.data;
          if (data.more.message) {
            setErrorMessage(data.more.message);
          } else {
            setErrorMessage("Unknown");
          }
        } else {
          setErrorMessage("Unknown");
        }
      });
  };

  return (
    <div className="login-form">
      <h2 className="form-heading">Login</h2>
      {/* {JSON.stringify(process.env)} */}
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
            message="Could not login!"
            description={errorMessage}
            type="error"
            style={{ maxWidth: "400px", margin: "auto" }}
          />
        )}

        <div className="form-field">
          <label htmlFor="username">
            Username
            <span className="star" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            placeholder="Enter Your Username"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="username">
            Password
            <span className="star2" style={{ color: "red" }}>
              *
            </span>
          </label>
          <input
            placeholder="Enter Your Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-field">
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            Login
          </button>
          <button type="submit" className="signup-button">
            Signup
          </button>
        </div>
        <div className="form-field">
          <a href="#" className="forgot-password-link">
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
