var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  number: String
});


var Manufacturer = mongoose.model("Truck", DriverShema);

module.exports = Manufacturer;