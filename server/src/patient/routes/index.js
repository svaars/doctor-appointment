const express = require("express");
const { verifyUser } = require("../../auth/authenticate");
const { RespondError, CommonErrors } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");
const router = express.Router();

const dayjs = require("dayjs");
const Session = require("../../session/models/Session");
const User = require("../../user/models/User");
const Report = require("../model/Report");

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
/*
    *GET ALL APPOINTMENTS (BEFORE OR AFTER A DATE IF SPECIFIED)*
    ENDPOINT : /patients/appointments
    QUERY: {from, to}
    RETURN: { success: true, session:{object}}
*/
router.get("/:id", verifyUser, async (req, res) => {
  try {
    let patient = await User.findOne({
      _id: req.params.id,
      userType: USERS.patient,
    });

    res.status(200).send(patient);
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});
/*
    *CREATE A REPORT FOR A PATIENT*
    ENDPOINT : /patients/:id/reports
    BODY: {content} 
    RETURN: [{object}]
*/
router.post("/:id/reports", verifyUser, async (req, res) => {
  try {
    if (req.user.userType !== USERS.doctor) {
      RespondError(res, CommonErrors.FORBIDDEN, {
        message: "Only doctors can create report",
      });
    }
    let reports = new Report({
      by: req.user._id,
      for: req.params.id,
      content: req.body.content,
    });
    const result = await reports.save();
    const resReport = await Report.findOne(result._id).populate("by");
    res.status(200).send(resReport);
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});
/*
    *GET ALL REPORTS OF A PATIENT*
    ENDPOINT : /patients/:id/reports
    QUERY: 
    RETURN: [{object}]
*/
router.get("/:id/reports", verifyUser, async (req, res) => {
  try {
    let reports = await Report.find({
      // by: req.params.id,
      for: req.params.id,
    })
      .populate("by")
      .sort({ createdAt: -1 });

    res.status(200).send(reports);
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});

module.exports = router;
