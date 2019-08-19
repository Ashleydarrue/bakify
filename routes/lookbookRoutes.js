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
    res.render('userViews/lookbook', {image: user.lookbook.images, theid: user.lookbook._id})
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
  Lookbook.findById(req.params.idOfImgPath)
  .then((lookbook)=>{

    lookbook.images.splice(req.params.indextodelete, 1)

    lookbook.save().then(()=>{
        res.redirect('/look/lookbook')
    })
  })
  .catch((err)=>{
      next(err);
  })

})

router.get("/lookbook/edit/:idOfImgPath/:indextoedit", (req,res,next)=>{
  let onePath = req.params.idOfImgPath
  let twoPath = req.params.indextoedit
  Lookbook.findById(req.params.idOfImgPath)
  .then((lookbook)=>{
    let thething = lookbook.images[twoPath]
    res.render('userViews/editLookbook', {image: thething, index: twoPath , idthing: onePath})
  // res.render('userViews/editLookbook', {layout:false, image: thething, index: twoPath , idthing: onePath})
})
  .catch((err)=>{
      next(err);
  })
})


router.post('/lookbook/update/:idOfImgPath/:indextoedit',(req,res,next)=>{
  let theID = req.params.idOfImgPath;
  let index = req.params.indextoedit
  console.log(theID, index)
  Lookbook.findById(theID)
  .then((lookbook) => {

    lookbook.images[index].comment = req.body.comment
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
        res.render('userViews/gallery', {galleries});
      })
  })

  router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/");
  })


module.exports = router;