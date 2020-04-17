const mongoose = require('mongoose');

var File = mongoose.model('File', {
    course: { type: String },
    filename: { type: String },
    file: { type: String },
    username: { type: String },
});

module.exports = { File };