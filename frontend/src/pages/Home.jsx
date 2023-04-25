import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import AppImage from "../images/hero-app-image_2.png";
import HomeNavbar from "../components/Common/HomeNavbar";

import "./Style/Home.scss";
import { ReactComponent as SVGEasyToUse } from "../images/feature_easy_to_use.svg";
import { ReactComponent as SVGSearch } from "../images/feature_doctor_search.svg";
import { ReactComponent as SVGTimeSaving } from "../images/feature_time_saving.svg";
import SignUpOption from "../components/Common/SignUpOption";

export default function Home() {
  return (
    <section id="home-wrapper">
      {/* <div id="account">
            <Button href='/login' block>Login</Button>
            <Button href='/signup' block>Signup</Button>
        </div> */}
      <div id="home">
        <HomeNavbar />
        <section id="hero">
          <div id="left">
            <h1>Book Your Doctor Appointment with Ease</h1>
            <h2>The Hassle-Free Way to Find the Right Doctor</h2>
            <p>
              Say goodbye to long wait times and confusing phone systems -
              schedule your appointment with just a few clicks.
            </p>
            <div className="cta">
              <Link className="primary" to={"/signup"}>
                Sign up now
              </Link>
              <Link className="secondary" to={"/login"}>
                Login
              </Link>
            </div>
          </div>
          <div id="right">
            <img src={AppImage} alt="BookMyDoctor app" />
          </div>
        </section>
        <section id="features">
          <h3>Features</h3>
          <div id="feature-list">
            <div className="feature-card my-card">
              <div className="svg-wrapper">
                <SVGEasyToUse className="feature-svg" />
              </div>
              <h4>Easy to use</h4>
              <div className="description">
                Our user-friendly interface makes it simple to find the right
                doctor and schedule an appointment in just a few clicks.
              </div>
            </div>
            <div className="feature-card my-card">
              <div className="svg-wrapper">
                <SVGSearch className="feature-svg" />
              </div>
              <h4>Comprehensive doctor search</h4>
              <div className="description">
                Our system allows you to search for doctors by location,
                specialty, and availability, ensuring that you find the right
                doctor at a time that works for you.
              </div>
            </div>
            <div className="feature-card my-card">
              <div className="svg-wrapper">
                <SVGTimeSaving />
              </div>
              <h4>Time-saving</h4>
              <div className="description">
                Our Doctor Appointment System helps you save time by eliminating
                the need to call multiple doctor's offices to find an available
                appointment.
              </div>
            </div>
          </div>
        </section>
        <section id="signup-now">
          <h3>Sign up now</h3>
          <SignUpOption />
        </section>
      </div>
      <Footer />
    </section>
  );
}

export const Footer = () => {
  return (
    <footer>
      Copyright © 2023 BookMyDoctor. All rights reserved. | Privacy Policy |
      Terms of Service
    </footer>
  );
};
