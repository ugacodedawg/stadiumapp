import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
import Stadium from '../models/stadium';
import Comment from '../models/comment';
let router = express.Router();

// router.post('/', (req, res) => {
//   let comment = req.body;
//   //stadium.owner_id = req.body.owner_id
//   comment._id = new mongodb.ObjectID(comment._id); // convert _id to object
//   database.db.collection('comments').save(comment).then((newComment) => {
//     res.json(newComment);
//     //console.log(newStadium);
//   })
// });

router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.id === undefined) {
    let newComment = new Comment({
      text:req.body.text,
      author:req.body.username
      //owner_id: req.body.owner_id
    });
    newComment.save(function(err, result) {
      if(err) {
        console.log(err);
        res.end();
      } else {
        console.log(result);
        res.end();
      }
    });
  // } else {
  //     Stadium.findByIdAndUpdate(req.body.id, { $set: { name:req.body.name, city:req.body.city, sport:req.body.sport }}, function(err, stadium) {
  //       if(err) {
  //         console.log(err);
  //         res.end();
  //       } else {
  //         console.log(comment);
  //         res.end();
  //       }
  //     });
    }
});


// router.get('/', (req, res) => {
//   database.db.collection('stadiums').find().toArray().then((stadiums)=>{
//     res.json(stadiums);
//   })
// });
//
// router.get('/:id', (req, res) => {
//   let stadiumId = new mongodb.ObjectID(req.params['id']);
//   database.db.collection('stadiums').findOne(stadiumId).then((stadium) => {
//     res.json(stadium);
//   });
// });

export default router;
