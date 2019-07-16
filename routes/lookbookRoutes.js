const express = require('express');
 const router = express.Router();
 const User   = require('../models/User');
 const Lookbook = require('../models/Lookbook');
 const uploadMagic = require('../config/cloundinary-setup');
 const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
const Gallery = require("../models/Gallery");
 
 router.get('/lookbook', ensureLogin.ensureLoggedIn(),(req, res, next)=>{
  User.findById(req.user._id).populate('lookbook')
  .then(user => {
    res.render('userViews/lookbook', {image: user.lookbook.images, layout:false, theid: user.lookbook._id})
  })
  .catch(err => {
    console.log(err)
  })

  })


router.post('/addimage', uploadMagic.single('thePic') ,(req, res, next)=>{
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const {comment} = req.body;

  Lookbook.findByIdAndUpdate(
    req.user.lookbook,
    {$push: {images: {imgPath: imgPath, comment: comment}}},)
    .then((lookbook)=>{
      console.log(lookbook);
      res.redirect('/look/lookbook');
    })
    .catch((error)=>{
      next(error)
    });
  
})

router.post('/lookbook/delete/:idOfImgPath/:indextodelete', (req, res, next)=>{

  console.log(req.params.idOfImgPath, req.params.indextodelete )

  Lookbook.findById(req.params.idOfImgPath)
  .then((lookbook)=>{

    lookbook.images.splice(req.params.indextodelete, 1)
     console.log(lookbook);

    lookbook.save().then(()=>{
        res.redirect('/look/lookbook')
    })
  })
  .catch((err)=>{
      next(err);
  })

})










router.get("/gallery", (req,res,next)=>{
    Gallery.find()
      .then(galleries => {
        res.render('userViews/gallery', {galleries, layout:false});
      })
  })

  router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/");
  })


module.exports = router;