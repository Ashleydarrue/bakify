const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema ({

    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    eventDate:{type: Date},
    lookbook: {type: Schema.Types.ObjectId, ref: 'Lookbook'}
})


const User = mongoose.model('User', userSchema);
module.exports = User;