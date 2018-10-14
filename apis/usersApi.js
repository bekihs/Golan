const router = require("express").Router();
const User = require("../dataAccess/userModel");
const UserParent = require("../dataAccess/userParent");

router.post("/", (req, res) => {

    const user = User.build(req.body);

    user.save().then((data) => {
        console.log(data);
        res.send(data);
    }, (err) => {
        console.error(err);
        res.status(500).send(err); 
    })

})
router.get("/down/:userName", (req, res) => {
    User.find({
        where: { userName: req.params.userName },
        include: [
            {
                model: UserParent,
                 as: "Children",
                include: [{model:User,  
                as: "Child"}]
            }
        ]
    }).then(( user) => {
       
            res.send(user); 
    } , (err)=> {
            console.error(err);
            res.status(500).send(err);
        })
})

router.get("/up/:userName", (req, res) => {
    User.find({
        where: { userName: req.params.userName },
        include: [
            {
                model: UserParent,
                 as: "Parents",
                include: [{model:User,  
                as: "Parent"}]
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