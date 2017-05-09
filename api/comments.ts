import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
//import Stadium from '../models/stadium';
let router = express.Router();

router.post('/', (req, res) => {
  let comment = req.body;
  //stadium.owner_id = req.body.owner_id
  comment._id = new mongodb.ObjectID(comment._id); // convert _id to object
  database.db.collection('comments').save(comment).then((newComment) => {
    res.json(newComment);
    //console.log(newStadium);
  })
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
