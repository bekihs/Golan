var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverShema = new Schema({
  number:  { type : String , unique : true},
  isArchive: {type:Boolean}
});


var Manufacturer = mongoose.model("Truck", DriverShema);

module.exports = Manufacturer;