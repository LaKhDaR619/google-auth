const express = require("express");
const app = express();
const cookieSession = require("cookie-session");

const passport = require("passport");
require("./passport-setup");

const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.user) return next();

  res.sendStatus(401);
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) return next();

  res.redirect("/");
};

app.get("/", (req, res) => {
  res.send(req.session);
});

app.get("/fail", (req, res) => res.send("You Failed to Login"));
app.get("/success", (req, res) => {
  res.send(`Welcome Mr:${req.user.displayName}`);
  console.log(req.user);
});

app.get(
  "/google",
  isNotLoggedIn,
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);

app.get("/logout", (req, res) => {
  req.logOut();
  res.send("Loged Out");
});

app.listen(PORT, () => console.log(`listening at port: ${PORT}`));
