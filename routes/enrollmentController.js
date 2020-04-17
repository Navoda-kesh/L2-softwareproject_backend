const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Enrollment } = require('../models/enrollment');

// router.post('/', (req, res) => {
//     var enrollment = new Enrollment({
//         course: req.body.course,
//         username: req.body.username,
//         fullname: req.body.fullname,
//         email: req.body.email
        
//     });
//     enrollment.save((err, doc) => {
//         if (!err) { 
//             res.send(doc);
//             console.log(doc);
//          }
//         else { console.log('Error in enrolling : ' + JSON.stringify(err, undefined, 2)); }
//     });
// });

router.post('/', (req, res) => {
    Enrollment.find({username:req.body.username , course:req.body.course}).
    exec().
    then(doc =>{
        if(doc.length>=1){
            res.json({enrollments:false});
        }
        else{
            var enrollment = new Enrollment({
                
                course: req.body.course,
                username: req.body.username,
                fullname: req.body.fullname,
                email: req.body.email 
            });
            enrollment.save((err,post)=>{
                if(!err){
                    res.json({enrollments:true});
                    console.log(post);
                }else{
                    
                    console.log(err);
                }
            });
        }
    });
  
    
});


/* get request for chat group */
router.get('/:room/:username', function(req,res,next){
    Enrollment.find({course:req.params.room, username:req.params.username}).exec()
    .then(doc=>{
        if(doc.length>=1){
            res.json({success:true,msg:'member is exist'});
        }
        else{
            res.json({success:false,msg:'member is not exist'});
        }
    });
      
});



router.get('/:course', (req, res) => {
    Enrollment.find({course: req.params.course}, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving data : ' + JSON.stringify(err, undefined, 2)); }
    });
});

/* for student dashboard */
/*router.get('/:username', function(req,res,next){
    console.log(req);
    Enrollment.find({username:req.params.username})
    
    .exec()
    .then(doc=>{
        res.json(doc);
        console.log("doc"+doc);
    });
});*/

/* router.get('/:username', (req, res) => {
    Enrollment.find({username: req.params.username}, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving data : ' + JSON.stringify(err, undefined, 2)); }
    });
}); */
router.get('/enrollment/username/:username', function(req,res,next){
    console.log('username'+req.params.username);
    Enrollment.find({username: req.params.username}).exec()
    .then(doc=>{
        res.json(doc);
    });
});


router.delete("/:enrollmentId", (req, res, next) => {
    const eId = req.params.enrollmentId;
    Enrollment.remove({ _id: eId })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Enrollment record removed',
            
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  
     
  });


router.delete("/:course", (req, res, next) => {
    const A = req.params.course;
    Enrollment.remove({ course : A })
      .exec()
      .then(result => {
        res.json({success:true});
      })
      .catch(err => {
        console.log(err);
        res.json({
          error: err
        });
      });
  }); 
 

  router.delete("/unregister/:username", (req, res, next) => {
    const A = req.params.username;
    Enrollment.remove({ username : A })
      .exec()
      .then(result => {
        res.json({success:true});
      })
      .catch(err => {
        console.log(err);
        res.json({
          error: err
        });
      });
  }); 




module.exports = router;