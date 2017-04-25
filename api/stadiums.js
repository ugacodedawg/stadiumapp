"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../db");
var mongodb = require("mongodb");
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
router.post('/', function (req, res) {
    var stadium = req.body;
    stadium._id = new mongodb.ObjectID(stadium._id);
    db_1.default.db.collection('stadiums').save(stadium).then(function (newStadium) {
        res.json(newStadium);
    });
});
router.delete('/:id', function (req, res) {
    var stadiumId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('stadiums').remove({ _id: stadiumId }).then(function () {
        res.sendStatus(200);
    });
});
exports.default = router;
