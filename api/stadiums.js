"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../db");
var mongodb = require("mongodb");
var stadium_1 = require("../models/stadium");
var router = express.Router();
router.get('/:id', function (req, res) {
    var stadiumId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('stadiums').findOne(stadiumId).then(function (stadium) {
        res.json(stadium);
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('stadiums').find().toArray().then(function (stadiums) {
        res.json(stadiums);
    });
});
router.post('/', function (req, res, next) {
    if (req.body.id === undefined) {
        var newStadium = new stadium_1.default({
            name: req.body.name,
            city: req.body.city,
            sport: req.body.sport,
            url: req.body.url,
            owner_id: req.body.owner_id
        });
        newStadium.save(function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }
        });
    }
    else {
        stadium_1.default.findByIdAndUpdate(req.body.id, { $set: { name: req.body.name, sport: req.body.sport } }, function (err, stadium) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(stadium);
            }
        });
    }
});
router.delete('/:id', function (req, res) {
    var stadiumId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('stadiums').remove({ _id: stadiumId }).then(function () {
        res.sendStatus(200);
    });
});
exports.default = router;
