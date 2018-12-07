
var express = require('express');
var router = express.Router();
var Driver = require("../models/DriverModel");
var EntityType = require("../models/EntityTypeModel");
var Manufacturer = require("../models/ManufacturerModel");
var Milkman = require("../models/MilkmanModel");
var Truck = require("../models/TrucksMoel");
var Delivery = require("../models/Delivery");

//the '/users' routes will go here

router.post('/', function(req, res, next) {

  // Milkman.findOne({name:req.body.milkman},(err , milkman)=>{
  //   if (err){
  //     console.error(err);
  //     res.status(500).send(err);
  //   } 
  //   else{console.log(milkman)
  //     req.body.price = milkman.prices[req.body.entityType];
    Delivery.create(req.body , function(err,result){
      if (err){
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(result);
      }
    })
  // }
  // })

});

  
    
router.get('/', function(req, res, next) {

  Delivery.find({}  , function(err,result){
    if (err){
      console.error(err);
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
 });
 
     
router.post('/:id', function(req, res, next) {

  Delivery.findByIdAndUpdate(req.params.id,req.body , {new: true}, function(err,result){
    if (err){
      console.error(err);
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
 });
 
 router.delete('/:id', function(req, res, next) {
 
   Delivery.findByIdAndRemove(req.params.id , function(err,result){
     if (err){
       console.error(err);
       res.status(500).send(err);
     }
     else{
       res.send(result);
     }
   })
  });
  
  
module.exports = router;