"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var stadium_1 = require("../models/stadium");
router.post('/', function (req, res, next) {
    console.log(req.body);
    if (req.body.id === undefined) {
        var newStadium = new stadium_1.default({
            name: req.body.name,
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
