var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const entityType = new Schema({
  entityType :  { type: Schema.Types.ObjectId, ref: 'EntityType' },
  price : Schema.Types.Decimal128 
})

var ManufacturerShema = new Schema({
  name: String,
  isClose: Boolean,
  prices :[entityType]
});


var Manufacturer = mongoose.model("Manufacturer", ManufacturerShema);

module.exports = Manufacturer;