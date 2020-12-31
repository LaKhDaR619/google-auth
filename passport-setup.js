const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "332399375182-vh2q974e8eafhcgg76qmqn0sisus33a4.apps.googleusercontent.com",
      clientSecret: "VTuKsdGKWDdannBBfLKPMiJl",
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("GoogleStrategy");
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser");
  done(null, id);
});
