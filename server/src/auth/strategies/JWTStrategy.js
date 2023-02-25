const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../../user/models/User");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Specifies how the JWT token is retreived from the request header
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    // Once the id is extracted retreive the user from DB to the req object
    User.findOne({ _id: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err, null);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
