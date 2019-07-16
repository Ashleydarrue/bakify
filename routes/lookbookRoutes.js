const express = require('express');
 const router = express.Router();
 const User   = require('../models/User');
 const Lookbook = require('../models/Lookbook');
 const uploadMagic = require('../config/cloundinary-setup');
 const passport = require('passport');
const ensureLogin = require("connect-ensure-login");

 
 router.get('/lookbook', ensureLogin.ensureLoggedIn(),(req, res, next)=>{
  User.findById(req.user._id).populate('lookbook')
  .then(user => {
    res.render('userViews/lookbook', {image: user.lookbook.images, layout:false})
  })
  .catch(err => {
    console.log(err)
  })

  })


router.post('/addimage', uploadMagic.single('thePic') ,(req, res, next)=>{
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const {comment} = req.body;

  // Lookbook.find({
  //   image: imgPath,
  //   comment
  // })

  // .then((lookbook) => {
  //   console.log(lookbook)
  // })
  // .catch(err => {
  //   console.log(err)
  // })

  // User.findByIdAndUpdate(req.user._id, { $push: {imgPath, comment} })
  //   .then((userDB) => {
  //     res.redirect('/look/lookbook')
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
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
  
  



  router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/");
  })


module.exports = router;