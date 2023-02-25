const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {
  getToken,
  getRefreshToken,
  COOKIE_OPTIONS,
} = require("../../auth/authenticate");

router.post("/signup", (req, res, next) => {
  // TODO: Do more input validations
  if (!req.body.firstname) {
    res.statusCode = 500;
    res.send({
      name: "FirstNameError",
      message: "The first name should not be empty!",
    });
  } else {
    // TODO: Ensure username and password is avaialble and valid
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          user.firstname = req.body.firstname;
          user.lastname = req.body.lastname || "";
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken }); // Pushing the new refreshToken to the user in db
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ succes: true, token });
            }
          });
        }
      }
    );
  }
});

module.exports = router;
