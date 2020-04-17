const mongoose = require('mongoose');

var Marks = mongoose.model('Marks', {
    course: { type: String },
    fullname: { type: String },
    username: { type: String },
    marks: { type: String },
    date: {type: Date }

});

module.exports = { Marks };