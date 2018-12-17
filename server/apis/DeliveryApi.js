
var express = require('express');
var router = express.Router();
var Driver = require("../models/DriverModel");
var EntityType = require("../models/EntityTypeModel");
var Manufacturer = require("../models/ManufacturerModel");
var Milkman = require("../models/MilkmanModel");
var Truck = require("../models/TrucksMoel");
var Delivery = require("../models/delivery");

//the '/users' routes will go here

router.post('/', function(req, res, next) {

  // Milkman.findOne({name:req.body.milkman},(err , milkman)=>{
  //   if (err){
  //     console.error(err);
  //     res.status(500).send(err);
  //   } 
  //   else{console.log(milkman)
  //     req.body.price = milkman.prices[req.body.entityType];
  if (!req.body.count){
    req.body.count = req.body.liter;
  }
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
 
    
router.post('/search/milkman', function(req, res, next) {
if (req.body.fromDate || req.body.toDate){
  const  fromDate = req.body.fromDate ? new Date(req.body.fromDate) : new Date(1,1,1970)
  const  toDate = req.body.toDate ? new Date(req.body.toDate) : new Date(1,1,2400)
  req.body,date =  {"$gte": fromDate, "$lt": toDate} ;
  req.body.fromDate = undefined;
  req.body.toDate = undefined;
  req.body.$not= {milkman: "שטראוס"};
}

const groupObj =  {
  totalAmout: { $sum:  "$count"  },
  sumPrice: { $sum: { $multiply: [ "$price", "$count" ] } },
  price: { $avg: "$price" },
  _id: "$milkman" 
};
 
req.body.grouping = undefined;

  Delivery.aggregate([ { "$match":   req.body},
  {
    $group:groupObj
     
  }], function(err,result){
    if (err){
      console.error(err);
      res.status(500).send(err);
    }
    else{
      groupObj._id.isClose = "$isClose";
  req.body.$not=undefined;
  req.body.milkman= "שטראוס";

      Delivery.aggregate([ { "$match":   req.body  },
      {
        $group:groupObj
         
      }] , function (err , rsult2){
      res.send([result , rsult2]);
    })}
  })
 });
 
  
router.post('/get', function(req, res, next) {
  if (req.body.fromDate || req.body.toDate){
    const  fromDate = req.body.fromDate ? new Date(req.body.fromDate) : new Date(1,1,1970)
    const  toDate = req.body.toDate ? new Date(req.body.toDate) : new Date(1,1,2400)
    req.body,date =  {"$gte": fromDate, "$lt": toDate} ;
    req.body.fromDate = undefined;
    req.body.toDate = undefined;
  }
   
  
    Delivery.find( req.body  , function(err,result){
      if (err){
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send([result , rsult2]);}
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