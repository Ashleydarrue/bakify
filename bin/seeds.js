// const mongoose = require('mongoose');
// const Gallery = require('../models/Gallery')

// mongoose
//   .connect('mongodb://localhost/bakify', {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.log('Connected to Mongo!')

//   }).catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

const galleryArray = [{
    Image: "/images/caraselcake.png"
  },

  {
    Image: "/images/babycake.jpg"
  },
  {
    Image: "/images/cakeimage.jpg"
  },

  {
    Image: "/images/cinderellacake.png"
  },
  {
    Image: "/images/cinderellacake2.jpeg"
  },
  {
    Image: "/images/dinasourcake.png"
  },
  {
    Image: "/images/disneycake.jpg"
  },
  {
    Image: "/images/gradcake.png"
  },
  {
    Image: "/images/icecreampop.jpg"
  },
  {
    Image: "/images/icecreampop.jpg"
  },
  {
    Image: "/images/mickey-cake.jpg"
  },
  {
    Image: "/images/mickeycake.jpg"
  },
  {
    Image: "/images/mickeypop.jpg"
  },
  {
    Image: "/images/minniecake.jpg"
  },
  {
    Image: "/images/moanacake.png"
  },
  {
    Image: "/images/moanapop.jpg"
  },
  {
    Image: "/images/plaincake.png"
  },
  {
    Image: "/images/plaincake2.png"
  },
  {
    Image: "/images/pop.jpg"
  },
  {
    Image: "/images/pop3.jpg"
  },
  {
    Image: "/images/pops.png"
  },
  {
    Image: "/images/redcake.jpg"
  },
  {
    Image: "/images/sportcake.png"
  },
  {
    Image: "/images/starwarscake.png"
  },
  {
    Image: "/images/toystorycake.png"
  },
  {
    Image: "/images/umcake.png"
  },
  {
    Image: "/images/unicake.png"
  },
  {
    Image: "/images/unicorncake.png"
  },
  {
    Image: "/images/unicornpop.jpg"
  },
  {
    Image: "/images/cinderellacake.jpeg"

  }
];

module.exports = galleryArray;

// Gallery.create(galleryArray)
//   .then(() => {
//     console.log('it worked')
//   })
//   .catch(() => {
//     console.log('it didnt work')
//   });