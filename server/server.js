if (process.env.NODE_ENV !== "production") {
  // Configuring .env variables if not the production
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("./src/utils/database/connectDb");

// Routes
const userRoute = require("./src/user/routes");
const sessionRoute = require("./src/session/routes");
const doctorRoute = require("./src/doctor/routes");

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Setup passport strategies and authenticate.js
require("./src/auth/strategies/JWTStrategy");
require("./src/auth/strategies/LocalStrategy");
require("./src/auth/authenticate.js");

// Whitelist our domain

//#region CORS
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOption = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};
app.use(cors(corsOption));
// #endregion

app.use(passport.initialize());
app.use("/users", userRoute);
app.use("/sessions", sessionRoute);
app.use("/doctors", doctorRoute);

//#region Server listening Setup
// Setting up server
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Server running successfully!");
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running at http://localhost:" + port);
  }
});
// #endregion
