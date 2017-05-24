import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
import Stadium from '../models/stadium';
let router = express.Router();


// Get a single stadium by id
router.get('/:id', (req, res) => {
  Stadium.findById(req.params['id']).then((stadium) => {
    res.json(stadium);
  });
});

// router.get('/:id', (req, res) => {
//   let stadiumId = new mongodb.ObjectID(req.params['id']);
//   database.db.collection('stadiums').findOne(stadiumId).then((stadium) => {
//     res.json(stadium);
//   });
// });

// GET all stadiums
router.get('/', (req, res) => {
  Stadium.find().then((stadiums)=> {
      res.json(stadiums);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

// router.get('/', (req, res) => {
//   database.db.collection('stadiums').find().toArray().then((stadiums)=>{
//     res.json(stadiums);
//   })
// });

// // Create new stadium
// router.post('/', (req, res) => {
//   let stadium = new Stadium();
//   stadium.name = req.body.name;
//   stadium.sport = req.body.sport;
//   stadium.owner_id = req.body.owner_id;
//
//   // save new stadium
//   stadium.save().then((newStadium) => {
//     res.json(newStadium);
//   }).catch((err) => {
//     res.status(400).json(err);
//   });
// });
//
// // Update existing stadium
// router.post('/:id', (req, res) => {
//   let stadiumId = req.params.id;
//
//   Stadium.findById(stadiumId).then((stadium) => {
//     stadium.name = req.body.name;
//     stadium.sport = req.body.sport;
//
//     // save updated stadium
//     stadium.save().then((updatedStadium) => {
//       res.json(updatedStadium);
//     }).catch((err) => {
//       res.status(400).json(err);
//     });
//
//   }).catch(() => {
//     res.sendStatus(404);
//   });
//
// });


// ----- MongoDB style ----- //
// router.post('/', (req, res) => {
//   let stadium = req.body;
//   stadium._id = new mongodb.ObjectID(stadium._id); // convert _id to object
//   database.db.collection('stadiums').save(stadium).then((newStadium) => {
//     res.json(newStadium);
//     //console.log(newStadium);
//   })
// });

router.post('/', function(req, res, next) {
  // console.log(req.body);
  if(req.body._id === undefined) {
    let newStadium = new Stadium({
      name:req.body.name,
      city:req.body.city,
      sport:req.body.sport,
      url:req.body.url,
      username:req.body.username
      //owner_id: req.body.owner_id
    });
    newStadium.save(function(err, result) {
      if(err) {
        console.log(err);
        res.end();
      } else {
        console.log(result);
        res.end();
      }
    })
  } else {
      Stadium.findByIdAndUpdate(req.body._id, { $set: { name:req.body.name, city:req.body.city, sport:req.body.sport }}, function(err, stadium) {
        if(err) {
          console.log(err);
          res.end();
        } else {
          console.log(stadium);
          res.end();
        }
      });
    }
});

// router.delete('/:id', (req, res) => {
//   let stadiumId = new mongodb.ObjectID(req.params['id']);
//   database.db.collection('stadiums').remove({_id:stadiumId}).then(()=> {
//     res.sendStatus(200);
//   });
//
// });

// Delete stadium
router.delete('/:id', (req, res) => {
  let stadiumId = req.params.id;
  Stadium.remove({_id:stadiumId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;
