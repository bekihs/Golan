const mongoose = require("mongoose")
const schema = new mongoose.schema({
    firstName:{type:String},
    age:Number
});

const model = mongoose.model("User" , schema);
module.exports = model;