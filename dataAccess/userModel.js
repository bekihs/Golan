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
  // father: {
  //   type: Sequelize.STRING,
  // },
  // mother: {
  //   type: Sequelize.STRING,
  // }
});

// User.belongsTo(User, { foreignKey: 'father' , as: "Father" })
// User.belongsTo(User, { foreignKey: 'mother' , as:"Mother" })
// User.hasMany(User, { foreignKey: 'father' , as: "ChildrenFather" })
// User.hasMany(User, { foreignKey: 'mother' , as: "ChildrenMother" }) 

module.exports = User;