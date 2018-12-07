var express = require('express');
var router = express.Router();
var Driver = require("../models/DriverModel");
var EntityType = require("../models/EntityTypeModel");
var Manufacturer = require("../models/ManufacturerModel");
var Milkman = require("../models/MilkmanModel");
var Truck = require("../models/TrucksMoel");

//the '/users' routes will go here

router.post('/driver', function(req, res, next) {

 Driver.create(req.body , function(err,result){
   if (err){
     console.error(err);
     res.status(500).send(err);
   }
   else{
     res.send(result);
   }
 })
});


router.post('/entityType', function(req, res, next) {

  EntityType.create(req.body , function(err,result){
    if (err){
      console.error(err);
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
 });

 router.post('/manufacturers', function(req, res, next) {
 
  Manufacturer.create(req.body , function(err,result){
     if (err){
       console.error(err);
       res.status(500).send(err);
     }
     else{
       res.send(result);
     }
   })
  });
  router.post('/milkman', function(req, res, next) {
  
    Milkman.create(req.body , function(err,result){
      if (err){
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(result);
      }
    })
   });
   router.post('/truck', function(req, res, next) {
   
    Truck.create(req.body , function(err,result){
       if (err){
         console.error(err);
         res.status(500).send(err);
       }
       else{
         res.send(result);
       }
     })
    });

    
router.get('/driver', function(req, res, next) {

  Driver.find({}  , function(err,result){
    if (err){
      console.error(err);
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
 });
 
 
 router.get('/entityType', function(req, res, next) {
 
   EntityType.find({}  , function(err,result){
     if (err){
       console.error(err);
       res.status(500).send(err);
     }
     else{
       res.send(result);
     }
   })
  });
 
  router.get('/manufacturers', function(req, res, next) {
  
   Manufacturer.find({}  , function(err,result){
      if (err){
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(result);
      }
    })
   });
   router.get('/milkman', function(req, res, next) {
   
     Milkman.find({} , function(err,result){
       if (err){
         console.error(err);
         res.status(500).send(err);
       }
       else{
         res.send(result);
       }
     })
    });
    router.get('/truck', function(req, res, next) {
    
     Truck.find({} , function(err,result){
        if (err){
          console.error(err);
          res.status(500).send(err);
        }
        else{
          res.send(result);
        }
      })
     });



     
router.post('/driver/:id', function(req, res, next) {

  Driver.findByIdAndUpdate(req.params.id,req.body , {new: true}, function(err,result){
    if (err){
      console.error(err);
      res.status(500).send(err);
    }
    else{
      res.send(result);
    }
  })
 });
 
 
 router.post('/entityType/:id', function(req, res, next) {
 
   EntityType.findByIdAndUpdate(req.params.id,req.body ,  {new: true},function(err,result){
     if (err){
       console.error(err);
       res.status(500).send(err);
     }
     else{
       res.send(result);
     }
   })
  });
 
  router.post('/manufacturers/:id', function(req, res, next) {
  
   Manufacturer.findByIdAndUpdate(req.params.id,req.body , {new: true}, function(err,result){
      if (err){
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(result);
      }
    })
   });
   router.post('/milkman/:id', function(req, res, next) {
   
     Milkman.findByIdAndUpdate(req.params.id,req.body , {new: true}, function(err,result){
       if (err){
         console.error(err);
         res.status(500).send(err);
       }
       else{
         res.send(result);
       }
     })
    });
    router.post('/truck/:id', function(req, res, next) {
    
     Truck.findByIdAndUpdate(req.params.id,req.body , {new: true}, function(err,result){
        if (err){
          console.error(err);
          res.status(500).send(err);
        }
        else{
          res.send(result);
        }
      })
     });
 
     
 router.delete('/driver/:id', function(req, res, next) {
 
   Driver.findByIdAndRemove(req.params.id , function(err,result){
     if (err){
       console.error(err);
       res.status(500).send(err);
     }
     else{
       res.send(result);
     }
   })
  });
  
  
  router.delete('/entityType/:id', function(req, res, next) {
  
    EntityType.findByIdAndRemove(req.params.id , function(err,result){
      if (err){
        console.error(err);
        res.status(500).send(err);
      }
      else{
        res.send(result);
      }
    })
   });
  
   router.delete('/manufacturers/:id', function(req, res, next) {
   
    Manufacturer.findByIdAndRemove(req.params.id  , function(err,result){
       if (err){
         console.error(err);
         res.status(500).send(err);
       }
       else{
         res.send(result);
       }
     })
    });
    router.delete('/milkman/:id', function(req, res, next) {
    
      Milkman.findByIdAndRemove(req.params.id , function(err,result){
        if (err){
          console.error(err);
          res.status(500).send(err);
        }
        else{
          res.send(result);
        }
      })
     });
     router.delete('/truck/:id', function(req, res, next) {
     
      Truck.findByIdAndRemove(req.params.id, function(err,result){
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