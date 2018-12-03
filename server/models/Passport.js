var passport = require('passport');
var User = require('../models/UserModel');


// Configure passport-local to use user model for authentication
passport.use(User.createStrategy()); // local strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



module.exports = passport;
