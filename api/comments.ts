import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
import Stadium from '../models/stadium';
import Comment from '../models/comment';
let router = express.Router();

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
  Stadium.findOne({_id: req.params['id']}).populate('comments').exec(function (err, results:any) {
    if(err) {
      res.send(err);
    } else {
      res.json(results.comments);
    }
  })
});

export default router;
