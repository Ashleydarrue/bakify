require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require("express-session");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
mongoose.set('useFindAndModify', false);
// const data = require('./bin/seeds')
// const Gallery = require('./models/Gallery')

mongoose
  .connect(process.env.MONGOLAB_NAVY_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    // Gallery.insertMany(data)
    //   .then(() => {
    //     console.log('Saved')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));





// Passport - app.js
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



app.use(flash());
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Sorry we couldn't find that username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Password not correct for that username" });
    }

    return next(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.msg         = req.flash('error')
  next();
});


const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/userRoutes');
app.use('/auth', auth);

const look = require('./routes/lookbookRoutes');
app.use('/look' , look)

const all = require('./routes/allLookbooksRoutes');
app.use('/all', all);

module.exports = app;
