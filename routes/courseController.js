const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


var { Course } = require('../models/course');

router.post('/', (req, res) => {

    Course.find({ course: req.body.course})
     .exec()
     .then(course => {
       if (course.length >= 1) {
         //return res.status(409).json({
           //message: 'Username exists'
           //console.log('Username exists');
           res.json({success: false, msg:'course already exists'});
         }

        else {

    var course = new Course({
    course: req.body.course,
    duartion: req.body.duration,
    regfee: req.body.regfee,
    totfee: req.body.totfee,
    insfee: req.body.insfee,
    dayandtime: req.body.dayandtime,
    sdate: req.body.sdate,
    edate: req.body.edate
    });
    course.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in course details save : ' + JSON.stringify(err, undefined, 2)); }
    });
        };
    });
})


router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Course Delete : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/', (req, res) => {
    Course.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving course details : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:course', (req, res) => {
    Course.find({course: req.params.course}, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving course details : ' + JSON.stringify(err, undefined, 2)); }
    });
});





module.exports = router;