"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../db");
var mongodb = require("mongodb");
var router = express.Router();
router.post('/', function (req, res) {
    var comment = req.body;
    comment._id = new mongodb.ObjectID(comment._id);
    db_1.default.db.collection('comments').save(comment).then(function (newComment) {
        res.json(newComment);
    });
});
exports.default = router;
