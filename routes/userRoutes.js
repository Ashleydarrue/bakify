
const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');
const passport = require('passport');
const Lookbook = require('../models/Lookbook');
const ensureLogin = require("connect-ensure-login");



router.post('/signup', (req, res, next)=>{
  const thePassword = req.body.password;
  const theUsername = req.body.username;
  const theDate = req.body.eventDate;

  
  

  const salt = bcrypt.genSaltSync(12);
  const hashedPassWord =  bcrypt.hashSync(thePassword, salt);
    Lookbook.create({}).then((lookbook)=>{ 
      User.create({
        username: theUsername,
        password: hashedPassWord,
        eventDate: theDate,
        lookbook: lookbook,
      })
      .then(()=>{
        console.log('yay');
        res.redirect('/')
      })
      .catch((err)=>{
        next(err);
      })
    })
})

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => { 

  const date1 = new Date(req.user.eventDate);
  const date2 = new Date();
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 
  res.render("userViews/profile", { layout: false, user: req.user, daysTill: diffDays });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect("/");
})
module.exports = router;