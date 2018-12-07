var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Delivery = new Schema({
  entityType : String,//  { type: Schema.Types.ObjectId, ref: 'EntityType' },
  manufacturer : String,//  { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
  driver :  String,// { type: Schema.Types.ObjectId, ref: 'Driver' },
  truck : String,//  { type: Schema.Types.ObjectId, ref: 'Truck' },
  milkman : String,// { type: Schema.Types.ObjectId, ref: 'Milkman' },
  price :Schema.Types.Decimal128,
  liter :Schema.Types.Decimal128,
  count :Schema.Types.Decimal128,
  date: Date,
  cerDel:String,
  cerSell:String
});


var Manufacturer = mongoose.model("Delivery", Delivery);

module.exports = Manufacturer;