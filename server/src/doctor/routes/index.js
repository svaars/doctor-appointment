const express = require("express");
const { verifyUser } = require("../../auth/authenticate");
const { RespondError, CommonErrors } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");
const User = require("../../user/models/User");
const router = express.Router();
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

module.exports = router;
