var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  name: { type : String , unique : true},
  number: { type : String }
});


var Manufacturer = mongoose.model("Driver", DriverShema);

module.exports = Manufacturer;