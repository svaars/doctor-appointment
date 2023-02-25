const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../user/models/User");

// This is the strategy to use while user is logging in
passport.use(new LocalStrategy(User.authenticate()));

// This tells passport to serialize the user after login to req.user
passport.serializeUser(User.serializeUser());
