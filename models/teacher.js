const mongoose = require('mongoose');

var Teacher = mongoose.model('Teacher', {
    course: { type: String },
    teacher: { type: String }
    
    
});

module.exports = { Teacher };