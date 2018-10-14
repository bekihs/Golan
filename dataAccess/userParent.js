const da = require("./da")
const User = require("./userModel")
var Sequelize = require('sequelize'); 

const UserParent = da.connection.define('users_parents', {
  userName: {
    type: Sequelize.STRING ,
    primaryKey: true
  },
  parentName:  {
    type: Sequelize.STRING ,
    primaryKey: true
  }
});

UserParent.belongsTo(User, { foreignKey: 'userName' , as: "Child"  })
UserParent.belongsTo(User, { foreignKey: 'parentName' , as: "Parent"  })
User.hasMany(UserParent, { foreignKey: 'userName' , as: "Parents",  useJunctionTable: false    })
User.hasMany(UserParent, { foreignKey: 'parentName' , as: "Children",  useJunctionTable: false    })

module.exports = UserParent;