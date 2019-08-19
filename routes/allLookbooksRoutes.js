const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lookbook = require('../models/Lookbook');
const uploadMagic = require('../config/cloundinary-setup');
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
const Gallery = require("../models/Gallery");


// Orginal
// router.get("/allLookBooks", (req,res,next)=>{
//   Lookbook.find()
//   .then((lookbooks)=>{

//       res.render('userViews/allLookbooks', {lookbooks: lookbooks, layout:false});
//     })
// })


//testing
router.get('/allLookBooks',ensureLogin.ensureLoggedIn() ,(req, res, next) => {
  User.find().populate('lookbook')
    .then((allUsers) => {
      let tempArray = []
         allUsers.forEach((oneUser) => {
           oneUser.lookbook.images.forEach((onelook) => {
           onelook.owner = oneUser.username
           tempArray.push(onelook)
         })
       })
        data = {
         lookbooks: tempArray,
        //  layout: false
        }
      res.render('userViews/allLookbooks', data)
    }).catch(err => next(err));
});

router.post('/addthisimage/:idOfThing', (req,res, next)=>{
  console.log(req.params.idOfThing);
  const theID = req.params.idOfThing;
    Lookbook.findOne({'images._id': mongoose.Types.ObjectId(theID)})
    .then((lookbook)=>{
      if(lookbook){
        lookbook.images.forEach((image)=>{
          if(image._id.toString()=== theID){
            console.log('Should get here some time');
            Lookbook.findByIdAndUpdate(req.user.lookbook, {
              $push:{
                images:{
                  imgPath: image.imgPath,
                  comment: image.comment,
                }
              }
            }).then(()=>{
              res.redirect('/look/lookbook');
            }).catch((err)=>{
              console.log(err);
            });
          }
        })  
      }
      
    })
    .catch((error)=>{
      next(error)
    });
})





module.exports = router;