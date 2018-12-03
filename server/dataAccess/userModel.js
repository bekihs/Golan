const da = require("./da")
var Sequelize = require('sequelize'); 

const User = da.connection.define('users', {
  userName: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  imageURL: {
    type: Sequelize.STRING
  },
   
});
 
module.exports = User;