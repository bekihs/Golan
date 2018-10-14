const express = require("express");
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const usersApi = require("./apis/usersApi");


app.use(bodyParser.json({limit: '500kb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '500kb' }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})
app.use("/users",usersApi);
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(express.static('build'));

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '/build/index.html'));
//   })
app.listen(3001);