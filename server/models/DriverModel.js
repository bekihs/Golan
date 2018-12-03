var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  name: String,
  number: String
});


var Manufacturer = mongoose.model("Driver", DriverShema);

module.exports = Manufacturer;