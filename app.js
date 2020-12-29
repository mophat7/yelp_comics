//NPM Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const flash = require("connect-flash");
process.unhandledRejections = "strict";
//===Config Imports=======
try {
  var config = require("./config");
} catch (error) {
  console.log(`error occured ${error}`);
}

const User = require("./models/user");
//============================
//SETTINGS
//==============================
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//============================
//DEVELOPMENT
//==============================
const comicRoutes = require("./routes/comics");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");

//============================
//seed DB
//==============================
// const seed = require("./utils/seed");
// seed();
// Route Imports

app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

try {
  mongoose.connect(config.db.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (error) {
  console.log("connection error working locally not" + error);
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

//express sessions
app.use(
  expressSession({
    secret: process.env.ES_SECRET || config.expressSession.secret,
    resave: false,
    saveUninitialized: false,
  })
);
//flash
app.use(flash());
//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

//Current User Middle ware
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errorMessage = req.flash("error");
  res.locals.successMessage = req.flash("success");

  next();
});

// usee rotes
app.use("/comics", comicRoutes);
app.use(commentRoutes);
app.use(mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
