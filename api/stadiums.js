"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var stadium_1 = require("../models/stadium");
var router = express.Router();
router.get('/:id', function (req, res) {
    stadium_1.default.findById(req.params['id']).then(function (stadium) {
        res.json(stadium);
    });
});
router.get('/', function (req, res) {
    stadium_1.default.find().then(function (stadiums) {
        res.json(stadiums);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.post('/', function (req, res, next) {
    console.log(req.body);
    if (req.body.id === undefined) {
        var newStadium = new stadium_1.default({
            name: req.body.name,
            city: req.body.city,
            sport: req.body.sport,
            url: req.body.url,
            username: req.body.username
        });
        newStadium.save(function (err, result) {
            if (err) {
                console.log(err);
                res.end();
            }
            else {
                console.log(result);
                res.end();
            }
        });
    }
    else {
        stadium_1.default.findByIdAndUpdate(req.body.id, { $set: { name: req.body.name, city: req.body.city, sport: req.body.sport } }, function (err, stadium) {
            if (err) {
                console.log(err);
                res.end();
            }
            else {
                console.log(stadium);
                res.end();
            }
        });
    }
});
router.delete('/:id', function (req, res) {
    var stadiumId = req.params.id;
    stadium_1.default.remove({ _id: stadiumId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
exports.default = router;
