var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const entityType = new Schema({
  entityType :  { type: Schema.Types.ObjectId, ref: 'EntityType' },
  price : Schema.Types.Decimal128 
})

var MilkmanShema = new Schema({
  name:  { type : String , unique : true},
  prices :Schema.Types.Mixed,
  types:[]
});


var Manufacturer = mongoose.model("Milkman", MilkmanShema);

module.exports = Manufacturer;