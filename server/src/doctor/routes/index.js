const express = require("express");
const { verifyUser } = require("../../auth/authenticate");
const { RespondError, CommonErrors } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");
const User = require("../../user/models/User");
const router = express.Router();
const Session = require("../../session/models/Session");

const dayjs = require("dayjs");

/*
    *GET ALL CITIES*
    ENDPOINT : /doctors/cities
    RETURN: [{object}]
*/
router.get("/cities", async (req, res) => {
  try {
    User.find({ userType: USERS.doctor }).then((users) => {
      let cities = users.map((user) =>
        user.doctorData.clinic.city.toLowerCase()
      );

      cities = [...new Set(cities)];
      res.send(cities);
    });
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});

/*
    *SEARCH FOR DOCTORS*
    ENDPOINT : /doctors/search
    RETURN: [{object}]
*/
router.get("/search", async (req, res) => {
  const { term, location, date } = req.query;
  const termRgx = new RegExp(term, "i");
  const locationRgx = new RegExp(location, "i");
  const dbQuery = {
    userType: USERS.doctor,

    $or: [
      { firstname: termRgx },
      { lastname: termRgx },
      { "doctorData.specialization": termRgx },
      { "doctorData.clinic.clinicName": termRgx },
      { "doctorData.clinic.street": termRgx },
    ],

    $and: [{ "doctorData.clinic.city": locationRgx }],
  };
  const results = await User.find(dbQuery);
  res.send(results);
});

/*
    *GET ONE DOCTOR WITH ID*
    ENDPOINT : /doctors/:id
    RETURN: {object}
*/
router.get("/:id", async (req, res) => {
  try {
    const result = await User.findOne({
      userType: USERS.doctor,
      _id: req.params.id,
    });
    res.send(result);
  } catch (err) {
    console.log("Error: " + err);
    RespondError(res, err.type, { error: err });
  }
});

/*
    *GET ALL SESSIONS OF THE DOCTOR*
    ENDPOINT : /doctors/:id/sessions
    RETURN: [{object}]
*/
router.get("/:doctor/sessions", async (req, res) => {
  try {
    const query = {
      doctor: req.params.doctor,
    };
    console.log(req.query.date);
    if (req.query.date) {
      query.date = {
        $gte: new dayjs(req.query.date).toDate(),
        $lt: new dayjs(req.query.date).add(1, "day").toDate(),
      };
    }

    if (req.query.to) {
      !query.date && (query.date = {});
      query.date.$lte = req.query.to;
    }
    console.log(query);

    const result = await Session.find(query);
    res.send(result);
  } catch (err) {
    console.log("Error: " + err);
    RespondError(res, err.type, { error: err });
  }
});

module.exports = router;
