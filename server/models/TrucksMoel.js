var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  name: String,
  number: String
});


var Manufacturer = mongoose.model("Truck", DriverShema);

module.exports = Manufacturer;