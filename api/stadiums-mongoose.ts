import * as express from 'express';
let router = express.Router();
import Stadium from '../models/stadium';

router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.id === undefined) {
    let newStadium = new Stadium({
      name:req.body.name,
      sport:req.body.sport,
      url:req.body.url,
      owner_id: req.body.owner_id
    });
    newStadium.save(function(err, res) {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    })
  } else {
      Stadium.findByIdAndUpdate(req.body.id, { $set: { name:req.body.name, sport:req.body.sport }}, function(err, stadium) {
        if(err) {
          console.log(err);
        } else {
          console.log(stadium);
        }
      });
  }
})
