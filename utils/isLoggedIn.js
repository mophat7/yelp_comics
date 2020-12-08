function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please Log In to Continue...");
    res.redirect("/login");
  }
}

module.exports = isLoggedIn;
