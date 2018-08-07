const express = require("express");
let path = require('path');
let cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
let morgan = require('morgan');
let mongo = require('mongodb');
let User = require('./models/User');
let Property = require("./models/Property");

// Routers
let users = require('./routes/api/users');
let properties = require("./routes/api/properties");
const app = express();

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));


// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: { httpOnly: true }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser(function (id, done) {
	console.log(id, '--');
	User.getUserById(id, function (err, user) {
		done(err, user);
		console.log(user);
	});
});

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global lets
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use('/api/users', users);
app.use(properties);


app.get("/checkapi", ( req, res ) =>{
  User
  .find({})
  .sort({ date: -1 })
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
})

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/lilypadDB"
);

let db = mongoose.connection;

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
