const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../user/models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    // Once the id is extracted retreive the user from DB to the req object
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);

        // or you could create a new account
      }
    });
  })
);
