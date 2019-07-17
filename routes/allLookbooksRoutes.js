const express = require('express');
 const router = express.Router();
 const User   = require('../models/User');
 const Lookbook = require('../models/Lookbook');
 const uploadMagic = require('../config/cloundinary-setup');
 const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
const Gallery = require("../models/Gallery");



router.get("/allLookBooks", (req,res,next)=>{
  Lookbook.find()
  .then((lookbook)=>{
     console.log(lookbook)
    // let thething = lookbook.images[onePath]
     
      res.render('userViews/allLookbooks', {lookbooks: thething, layout:false});
    })
})


module.exports = router;