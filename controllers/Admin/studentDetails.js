const express = require("express");
// const User = require("../../models/Users/userModel");
const LiveRegister = require("../LiveClassRegistration/registerModel");
const _ = require("lodash");

const router = express.Router(); 

router.get("/admin/studentDetails", async (req, res) => {
    try{

        const users = await LiveRegister.find().sort({"createdAt": -1});
        // console.log(users);
        res.render("home", {
            users: users
        });
        // if(!details){
        //     res.status(401).json({
        //         "message": "No user found!"
        //     })
        // }
        
        // details.forEach(element => {
        //     console.log(element.name);
        //     console.log(element.email);
        //     console.log(element.mobile);
        // });
        // res.status(200).json(details);
        
        
    }catch (err) {
        res.status(500).send(e);
    }
});

// router.post("/admin/studentDetails/search", async(req, res) => {
//     // console.log(req.body.searchValue);
//     const requestedName = _.startCase(_.camelCase(req.body.searchValue));
//     try{
//         const reqUser = await User.find({fullname: requestedName});
//         console.log(reqUser);
//         if(reqUser.length === 0){
//             console.log("No user found !!")
//             res.status(400).render("search", {
//                 name: requestedName,
//                 results: [],
//                 found: false
//             });
//         } else {
//             console.log("users found !!")
//             res.status(200).render("search", {
//                 name: reqUser,
//                 results: reqUser,
//                 found: true
//             });
//         }
//     }catch(e){
//         // console.log(e);
//         res.status(500).render("search", {
//             msg: "Some Error Occurred !"
//         })
//     }
// });

module.exports = router;