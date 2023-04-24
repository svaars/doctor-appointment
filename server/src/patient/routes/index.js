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
    const query = {
      "appointments.user": req.user._id,
    };
    if (from) {
      query.date = {
        $gte: new dayjs(from).toDate(),
      };
    }

    if (to) {
      query.date = { ...query.date, $lte: new dayjs(to).toDate() };
    }
    let sessions = await Session.find(query).populate(["doctor"]);
    sessions = sessions.map((session) => {
      session = session.toObject();
      const userAppointments = session.appointments.find((ap) =>
        ap.user.equals(req.user._id)
      );
      delete session.appointments;
      session.appointments = userAppointments;

      return session;
    });
    res.status(200).send(sessions);
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});

module.exports = router;
