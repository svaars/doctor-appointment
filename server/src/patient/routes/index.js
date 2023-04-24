const express = require("express");
const { verifyUser } = require("../../auth/authenticate");
const { RespondError, CommonErrors } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");
const router = express.Router();

const dayjs = require("dayjs");
const Session = require("../../session/models/Session");

/*
    *GET ALL APPOINTMENTS (BEFORE OR AFTER A DATE IF SPECIFIED)*
    ENDPOINT : /patients/appointments
    QUERY: {from, to}
    RETURN: { success: true, session:{object}}
*/
router.get("/appointments", verifyUser, async (req, res) => {
  try {
    if (req.user.userType != USERS.patient) {
      throw {
        type: CommonErrors.UNAUTHORIZED,
        message: "Only patients can access!",
      };
    }
    const { from, to } = req.query;
    const appointments = await Session.find({
      "appointments.user": req.user._id,
    });

    console.log(appointments);
    // if(from || to){
    // }

    res.status(200).send(appointments);
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});

module.exports = router;
