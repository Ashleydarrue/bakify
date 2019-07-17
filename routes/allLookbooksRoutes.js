const express = require('express');
const router = express.Router();
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
router.get('/allLookBooks', (req, res, next) => {
  User.find().populate('lookbook')
    .then(allUsers => {
      let tempArray = []
         allUsers.forEach(oneUser => {
           oneUser.lookbook.images.forEach(onelook => {
           onelook.owner = oneUser.username
           tempArray.push(onelook)
         })
       })
        data = {
         lookbooks: tempArray,
         layout: false
        }
      res.render('userViews/allLookbooks', data)
    }).catch(err => next(err));
});




module.exports = router;