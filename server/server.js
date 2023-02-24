// Configuring .env variables
require("dotenv").config();

const express = require("express");
const app = express();

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
