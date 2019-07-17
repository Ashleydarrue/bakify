const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const lookbookSchema = new Schema ({
 
  images: [{
    imgPath: {type: String}, 
    comment: {type: String},
    owner: {type: String} 
  }],
  // description: String
   
})


const Lookbook = mongoose.model('Lookbook', lookbookSchema);
module.exports = Lookbook ;