const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
// const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", (req, res) => {
  res.render("landing");
});

//signup New
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.register(
      new User({
        email: req.body.email,
        username: req.body.password,
      }),
      req.body.password
    );
    console.log(newUser);
    passport.authenticate("local")(req, res, () => {
      res.redirect("/comics");
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/comics",
   
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
