const express = require("express");
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const enumsApi = require("./server/apis/enumsApi");
const DeliveryApi = require("./server/apis/DeliveryApi");

const authRouting = require("./server/apis/authApi");
var mongoose = require('mongoose');
var expressSession = require('express-session');
var passport = require('./server/models/Passport');

mongoose.connect(process.env.mongod || 'mongodb://1:Aa123456@ds127704.mlab.com:27704/golan');


app.use(bodyParser.json({limit: '500kb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '500kb' }));

// Configure passport and session middleware
app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

// Create authentication middleware
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status('401').send({message: "Unauthorized" });
  }
};

// Add the auth routing
app.use("/auth",authRouting);
app.use("/api",ensureAuthenticated,enumsApi);
app.use("/delivery",DeliveryApi);

app.get('/currentuser', ensureAuthenticated, function(req, res) {
  if (req.user) {
    res.send(req.user.username)
  } else {
    res.send(null)  
  }
});

app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(express.static('build'));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/build/index.html'));
  })
app.listen(process.env.PORT || 3001);