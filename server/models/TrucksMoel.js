var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  number:  { type : String , unique : true}
});


var Manufacturer = mongoose.model("Truck", DriverShema);

module.exports = Manufacturer;