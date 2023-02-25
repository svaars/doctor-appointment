const mongoose = require("mongoose");
const Schema = mongoose.Schema;

passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
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
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
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
