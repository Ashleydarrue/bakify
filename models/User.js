const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema ({

    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    eventDate: {type: Date},
    // Have to add lookbook & checklist
})


const User = mongoose.model('User', userSchema);
module.exports = User;