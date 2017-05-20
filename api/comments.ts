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
  if(req.body.id === undefined) {
    let newComment = new Comment({
      text:req.body.text,
      author:req.body.author
    });
    newComment.save(function(err, newComment) {
      if(err) {
        res.end();
      } else {
        Stadium.findByIdAndUpdate(req.body.stadium_id, { "$push": { "comments": newComment._id }}, { "new": true, "upsert": true },
          function (err, updatedCategory) {
            if (err) {
              res.send(err)
            } else {
              res.send(updatedCategory);
            }
          }
        );
      }
    });
  }
});

// Get a single stadium by id
router.get('/:id', (req, res) => {
  Stadium.findById(req.params['id']).then((stadium) => {
    res.json(comments);
  });
});

// router.get('/:id', (req, res) => {
//   //Comments.find({stadium_id:{$eq: req.body._id }}).then((comments) => {
//   Stadium.findById(req.params['id']).then((comments)=> {
//       res.json(comments);
//   }).catch((err) => {
//       res.status(500);
//       console.error(err);
//   })
// });

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
