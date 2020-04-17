const mongoose = require('mongoose');

var Enrollment = mongoose.model('Enrollment', {
    
    course: { type: String },
    username: { type: String },
    fullname: { type: String },
    email: { type: String },
    
    
});

module.exports = { Enrollment };