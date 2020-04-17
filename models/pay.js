const mongoose = require('mongoose');

const PaySchema = new mongoose.Schema({
    username: String,
    course:String,
    amount:Number,
   
// message:String,
   // updated_at:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Pay',PaySchema );