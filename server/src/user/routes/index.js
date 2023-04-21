const express = require("express");
const router = express.Router();

const User = require("../models/User");

const passport = require("passport");

const jwt = require("jsonwebtoken");

const {
  getToken,
  getRefreshToken,
  COOKIE_OPTIONS,
  verifyUser,
} = require("../../auth/authenticate");
const { ExtractJwt } = require("passport-jwt");
const { CommonErrors, RespondError } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");

/*
    ENDPOINT : /user/signup
    BODY: { firstname*, lastname, username*, password* }
    RETURN: { success: true, token: jwt_token }, refreshToken COOKIE
*/
router.post("/signup", (req, res) => {
  const { userType } = req.body;
  // TODO: Do more input validations
  if (userType == USERS.doctor) {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      phoneNumber,
      dob,
      gender,
      specialization,
      regNo,
      regYear,
      stateCouncil,
      qualification,
      college,

      clinicName,
      street,
      city,
      state,
      country,
      pincode,
    } = req.body;

    if (
      !firstname ||
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      !dob ||
      !gender ||
      !specialization ||
      !regNo ||
      !regYear ||
      !stateCouncil ||
      !qualification ||
      !college ||
      !clinicName ||
      !street ||
      !city ||
      !state ||
      !country ||
      !pincode
    ) {
      RespondError(res, CommonErrors.BAD_REQUEST, {
        message: "Required fields missing!",
      });
    } else {
      // TODO: Ensure username and password is avaialble and valid
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
          if (err) {
            RespondError(res, CommonErrors.INTERNAL_ERROR, err);
          } else {
            user.userType = userType;
            user.firstname = firstname;
            user.lastname = lastname || "";
            user.email = email;

            user.generalData = {};
            user.generalData.phoneNumber = phoneNumber;
            user.generalData.dob = dob;
            user.generalData.gender = gender;

            user.doctorData = {};
            user.doctorData.specialization = specialization;
            user.doctorData.registrationNo = regNo;
            user.doctorData.registrationYear = regYear;
            user.doctorData.stateCouncil = stateCouncil;
            user.doctorData.qualification = qualification;
            user.doctorData.college = college;

            user.doctorData.clinic = {};
            user.doctorData.clinic.clinicName = clinicName;
            user.doctorData.clinic.street = street;
            user.doctorData.clinic.city = city;
            user.doctorData.clinic.state = state;
            user.doctorData.clinic.country = country;
            user.doctorData.clinic.pincode = pincode;

            const token = getToken({ _id: user._id });
            const refreshToken = getRefreshToken({ _id: user._id });
            user.refreshToken.push({ refreshToken }); // Pushing the new refreshToken to the user in db
            user.save((err, user) => {
              if (err) {
                RespondError(res, CommonErrors.INTERNAL_ERROR, err);
                console.log(err);
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.send({ succes: true, token });
              }
            });
          }
        }
      );
    }
  } else if (userType == USERS.patient) {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      phoneNumber,
      dob,
      gender,
    } = req.body;

    if (
      !firstname ||
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      !dob ||
      !gender
    ) {
      RespondError(res, CommonErrors.BAD_REQUEST, {
        message: "Required fields missing!",
      });
    } else {
      // TODO: Ensure username and password is avaialble and valid
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
          if (err) {
            RespondError(res, CommonErrors.INTERNAL_ERROR, err);
          } else {
            user.userType = userType;
            user.firstname = firstname;
            user.lastname = lastname || "";
            user.email = email;

            user.generalData = {};
            user.generalData.phoneNumber = phoneNumber;
            user.generalData.dob = dob;
            user.generalData.gender = gender;

            const token = getToken({ _id: user._id });
            const refreshToken = getRefreshToken({ _id: user._id });
            user.refreshToken.push({ refreshToken }); // Pushing the new refreshToken to the user in db
            user.save((err, user) => {
              if (err) {
                RespondError(res, CommonErrors.INTERNAL_ERROR, err);
                console.log(err);
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.send({ succes: true, token });
              }
            });
          }
        }
      );
    }
  }
});

// router.post("/doctor-complete-signup", verifyUser, async (req, res) => {
//   try {
//     await CompleteSignup(
//       req.user._id,
//       phone,
//       dob,
//       gender,
//       specialization,
//       regNo,
//       regYear,
//       stateCouncil,
//       qualification,
//       college,

//       clinicName,
//       street,
//       city,
//       state,
//       country,
//       pincode
//     );
//     res.send({ success: true });
//   } catch (err) {
//     RespondError(res, CommonErrors.INTERNAL_ERROR);
//   }
// });

/*
    ENDPOINT : /user/login
    BODY: {  username*, password* }
    RETURN: { success: true, token: jwt_token }, refreshToken COOKIE
*/
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, err) => {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });

    User.findById(req.user._id).then(
      (user) => {
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            RespondError(res, CommonErrors.INTERNAL_ERROR, err);
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token, userType: user.userType });
          }
        });
      },
      (err) => next(err)
    );
  }
);

/*
    ENDPOINT : /user/refresh-token
    BODY: {  }
    EXPECTS refreshToken as cookie
    RETURN: { success: true, token: jwt_token }, refreshToken COOKIE
*/
router.post("/refresh-token", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              RespondError(res, CommonErrors.UNAUTHORIZED);
            } else {
              const token = getToken({ _id: userId });

              // If the refresh token is present create a new one and replace the old one
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  RespondError(res, CommonErrors.INTERNAL_ERROR, err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.statusCode = 201;
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.get("/logout", verifyUser, (req, res) => {
  const { signedCookies = {} } = req;

  const { refreshToken } = signedCookies;

  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          RespondError(res, CommonErrors.INTERNAL_ERROR, err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },

    (err) => next(err)
  );
});

// Change later, now for testing verify
router.get(
  "/me",
  // (req, res, next) => {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(payload);
  //   next();
  // },
  verifyUser,
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
