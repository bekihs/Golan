var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManufacturerShema = new Schema({
  name: String,
  isClose: Boolean,
  types:[]
});


var Manufacturer = mongoose.model("Manufacturer", ManufacturerShema);

module.exports = Manufacturer;