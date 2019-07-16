const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gallerySchema = new Schema ({

    Image: {type: String}
   
})


const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;