
const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");



router.post('/signup', (req, res, next)=>{
  const thePassword = req.body.password;
  const theUsername = req.body.username;
  const theDate = req.body.eventDate;
  const salt = bcrypt.genSaltSync(12);
  const hashedPassWord =  bcrypt.hashSync(thePassword, salt);
  
      User.create({
          username: theUsername,
          password: hashedPassWord,
          eventDate: theDate,
      })
      .then(()=>{
          console.log('yay');
          res.redirect('/')
      })
      .catch((err)=>{
          next(err);
      })
})

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("userViews/profile", { layout: false, user: req.user });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/auth/logout', (req, res, next)=>{
  req.logout();
  res.redirect("/");
})

module.exports = router;