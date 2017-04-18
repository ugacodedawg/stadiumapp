import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';

let router = express.Router();

router.get('/:id', (req, res) => {
  let stadiumId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('stadiums').findOne(stadiumId).then((stadium) => {
    res.json(stadium);
  });
});

router.get('/', (req, res) => {
  database.db.collection('stadiums').find().toArray().then((stadiums)=>{
    res.json(stadiums);
  })
});

router.post('/', (req, res) => {
  let stadium = req.body;
  stadium._id = new mongodb.ObjectID(stadium._id); // convert _id to object
  database.db.collection('stadiums').save(stadium).then((newStadium) => {
    res.json(newStadium);
  })
});

router.delete('/:id', (req, res) => {
  let stadiumId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('stadiums').remove({_id:stadiumId}).then(()=> {
    res.sendStatus(200);
  });

});

export default router;
