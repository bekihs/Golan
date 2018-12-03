var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MilkmanShema = new Schema({
  name: String
});


var Manufacturer = mongoose.model("Milkman", MilkmanShema);

module.exports = Manufacturer;