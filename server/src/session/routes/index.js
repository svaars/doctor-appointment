const express = require("express");
const { verifyUser } = require("../../auth/authenticate");
const Session = require("../models/Session");
const { RespondError, CommonErrors } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");
const router = express.Router();

const dayjs = require("dayjs");

/*
    *CREATE A NEW SESSION*
    ENDPOINT : /sessions/
    BODY: { name*, date*, fromTime*, toTime*, maxPatient* }
    RETURN: { success: true, session:{object}}
*/
router.post("/", verifyUser, async (req, res) => {
  try {
    if (req.user.userType != USERS.doctor) {
      throw {
        type: CommonErrors.UNAUTHORIZED,
        message: "Only doctors can create session!",
      };
    }
    const { name, date, fromTime, toTime, maxPatients } = req.body;
    if (!name || !date || !fromTime || !toTime || !maxPatients) {
      throw {
        type: CommonErrors.BAD_REQUEST,
        message: "Required fields are missing!",
      };
    }
    const newSession = await new Session({
      name,
      doctor: req.user._id,
      date,
      fromTime,
      toTime,
      maxPatients,
    });
    await newSession.save();
    await newSession.populate("doctor");

    res.status(200).send({ success: true, session: newSession });
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});

/*
    *GET ALL SESSIONS*
    ENDPOINT : /sessions/
    QUERY: { date, doctor, populate:{doctor: Boolean, appointments: Boolean}}
    RETURN: { sessions:[{object}]}
*/
router.get("/", verifyUser, async (req, res) => {
  try {
    const {
      date,
      doctor,
      populate = { doctor: false, appointments: false },
    } = req.query;
    const finds = {};
    if (date) {
      const _date = dayjs(date).hour(0).minute(0).second(0);
      const _next_date = _date.add(1, "day");
      finds.date = { $gte: _date.toDate(), $lte: _next_date.toDate() };
      // finds.date =
      // finds.date = (date);
    }

    if (req.user.userType == USERS.doctor || doctor) {
      finds.doctor = doctor || req.user._id;
    }
    const populates = [];
    if (populate.doctor == "true") populates.push("doctor");
    if (populate.appointments == "true") populates.push("appointments.user");

    const sessions = await Session.find(finds).populate(populates);

    res.status(200).send({ sessions });
  } catch (err) {
    console.log(err);
    RespondError(res, err.type, { error: err });
  }
});

/*
    *GET ALL DETAILS ABOUT A SESSION*
    ENDPOINT : /sessions/:id
    QUERY: 
    RETURN: {object}
*/
router.get("/:session", async (req, res) => {
  const { session } = req.params;
  try {
    const result = await Session.findById(session).populate(
      "appointments.user"
    );
    res.send(result);
  } catch (err) {
    RespondError(res, CommonErrors.INTERNAL_ERROR, err);
  }
});

/*
    *CREATE AN APPOINTMENT IN SESSION*
    ENDPOINT : /sessions/:id/appointment 
    RETURN: {success: true}
*/
router.post("/:session/appointments", verifyUser, async (req, res) => {
  const { session } = req.params;
  try {
    const result = await Session.findById(session);
    if (req.user.userType !== USERS.patient) {
      RespondError(res, CommonErrors.UNAUTHORIZED, {
        details: "Only patients can book a solt!",
      });
    } else if (result.appointments.length >= result.maxPatients) {
      return RespondError(res, CommonErrors.BAD_REQUEST, {
        details: "Out of booking slots!",
      });
    } else {
      if (result.appointments.find((app) => app.user.equals(req.user._id))) {
        return RespondError(res, CommonErrors.BAD_REQUEST, {
          details: "Patient has already booked one slot!",
        });
      }
      // Find a token no
      let newTokenNo =
        result.appointments.length > 0
          ? result.appointments[result.appointments.length - 1].tokenNo + 1
          : 1;

      result.appointments.push({ user: req.user._id, tokenNo: newTokenNo });
      await result.save();
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    RespondError(res, CommonErrors.INTERNAL_ERROR, err);
  }
});

/*
    *SEARCHES IN SESSIONS*
    ENDPOINT : /sessions/search 
    QUERY: {location, term}
    RETURN: {success: true}
*/
router.get("/search", async (req, res) => {});

module.exports = router;
