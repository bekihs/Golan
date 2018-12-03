var Sequelize = require('sequelize');

class DataAccess{
    constructor(){
        
this.connection = new Sequelize('family_tree', 'root', '1234', {
  host: '127.0.0.1',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});
    }
}

const da = new DataAccess();
module.exports = da;