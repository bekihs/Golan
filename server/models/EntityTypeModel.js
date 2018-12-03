var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  name: String
});


var Manufacturer = mongoose.model("EntityType", DriverShema);

module.exports = Manufacturer;