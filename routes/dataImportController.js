var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
const csv = require('csvtojson');
const mongoClient = require('mongodb').MongoClient,
  assert = require('assert');
var originalName;


var store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname);
  }
});


var upload = multer({ storage: store }).single('file');

_router.post('/upload', function (req, res, next) {
  console.log("inside upload");
  upload(req, res, function (err) {
    if (err) {
      return res.status(501).json({ error: err });
    }    
    console.log(originalName);
    const url = 'mongodb://localhost:27017/meanauth';
    console.log('./uploads/' + req.file.filename);    
    // CSV File Path
    const csvFilePath = './uploads/' + req.file.filename;
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        //console.log(jsonObj[0]);
       // mongoClient.connect('mongodb://localhost:27017', (err, db) => {
        mongoClient.connect('mongodb+srv://meanauth:meanauth@meanauth-33jlf.mongodb.net/meanauth?retryWrites=true&w=majority', (err, db) => {
          if (err) throw err;
          var dbo = db.db("meanauth");         
          jsonObj.forEach(myobj => { 
            if(myobj.date){
              console.log("myobj.Date"+myobj.date); 
              var utc = "T01:34:12Z"
              var isoday = new Date(myobj.date+utc);
              //isoday.setDate(myobj.date);
              myobj.date = isoday;
              console.log("myobj.Date"+myobj.date); 
            }
            console.log(myobj); 
          
          dbo.collection("marks").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        }); 

        });
      });

    return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
  });
  
});

module.exports = _router; 
