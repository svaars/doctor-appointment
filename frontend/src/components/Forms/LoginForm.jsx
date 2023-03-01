import '../Style/LoginForm.css';
import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic
  };

  return (
    <div className="login-form">
        <h2 className="form-heading">Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="username">Username<span className="star" style={{color: "red"}}>*</span></label>
                <input
                  placeholder='Enter Your Username'
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  />
            </div>
            <div className="form-field">
                <label htmlFor="username">Password<span className="star2" style={{color: "red"}}>*</span></label>
                <input
                  placeholder='Enter Your Password'
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  />
            </div>
            <div className="form-field">
                <button type="submit" className="login-button">
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