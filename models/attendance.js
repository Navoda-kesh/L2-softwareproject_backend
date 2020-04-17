const mongoose = require('mongoose');

var Attendance = mongoose.model('Attendance', {
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref:'Enrollment', required:true },
    course: { type: String },
    username: { type: String },
    
    
});

module.exports = { Attendance };