const router = require("express").Router();
const User = require("../dataAccess/userModel");
const UserParent = require("../dataAccess/userParent");

router.post("/", (req, res) => {

    const user = User.build(req.body);

    user.save().then((data) => {
        console.log(data);
        if (req.body.parentName){
            userParent = UserParent.build({parentName:req.body.parentName , userName: data.userName});
            userParent.save().then((data)=>{
                getUserWithKids(req.body.parentName,res);   
            }, (err) => {
                console.error(err);
                res.status(500).send(err); 
            })
        }
        else
         res.send(data);
    }, (err) => {
        console.error(err);
        res.status(500).send(err); 
    })

})

function getUserWithKids(userName, res){
    User.find({
        where: { userName: userName },
        include: [
            {
                model: User,
                 as: "Children",
                 include:{
                     
                model: User,
                as: "Children"
                 }
            }
        ]
    }).then(( user) => {
       
            res.send(user); 
    } , (err)=> {
            console.error(err);
            res.status(500).send(err);
        })
} 
router.get("/down/:userName", (req,res)=>{getUserWithKids(req.params.userName, res)})

router.get("/up/:userName", (req, res) => {
    User.find({
        where: { userName: req.params.userName },
        include: [
            { model:User,  
                as: "Parents",
                include:[
                    {model:User,  
                        as: "Parents"}
                ]
            }
        ]
    }).then((user) => { 
            res.send(user);
    } , (err)=> {
        console.error(err);
        res.status(500).send(err);
    })
})

module.exports = router;