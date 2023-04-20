const mongoose = require("mongoose");
const { USERS } = require("../../utils/constants");
const Schema = mongoose.Schema;

passportLocalMongoose = require("passport-local-mongoose");

// This is authentication session has nothing to do with doctor sessions
const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const GeneralUser = {
  phoneNumber: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
};

const Clinical = {
  clinicName: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: String,
  },
};

const Doctor = {
  specialization: {
    type: String,
  },
  registrationNo: {
    type: String,
  },
  registrationYear: {
    type: String,
  },
  stateCouncil: {
    type: String,
  },
  qualification: {
    type: String,
  },
  college: {
    type: String,
  },
  clinic: {
    type: Clinical,
  },
};

const User = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "none",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
  userType: {
    type: String,
    enum: Object.values(USERS),
    default: "patient",
    required: true,
  },
  generalData: {
    type: GeneralUser,
  },
  doctorData: {
    type: Doctor,
  },
});

//Remove refreshToken from the response

User.set("toJSON", {
  transform: function (doc, res, options) {
    delete res.refreshToken;

    return res;
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
