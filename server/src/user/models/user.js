const mongoose = require("mongoose");
const Schema = mongoose.Schema;

passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const GeneralUser = new Schema({
  phoneNumber: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
});

const Clinical = new Schema({
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
});

const Doctor = new Schema({
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
});

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
    enum: ["doctor", "user", "admin"],
    default: "user",
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
