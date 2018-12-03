var passport = require('../models/passport');
var express = require('express');
var router = express.Router();
var User = require("../models/UserModel");

//the '/users' routes will go here

router.post('/register', function(req, res, next) {

  User.register(new User({ username: req.body.name, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user);
    });
  });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  User.findOne({username:req.user.username} , function(err,user){
    res.send(user);
  })
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

module.exports = router;