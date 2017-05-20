"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var stadium_1 = require("../models/stadium");
var comment_1 = require("../models/comment");
var router = express.Router();
router.post('/', function (req, res, next) {
    if (req.body.id === undefined) {
        var newComment = new comment_1.default({
            text: req.body.text,
            author: req.body.author
        });
        newComment.save(function (err, newComment) {
            if (err) {
                res.end();
            }
            else {
                stadium_1.default.findByIdAndUpdate(req.body.stadium_id, { "$push": { "comments": newComment._id } }, { "new": true, "upsert": true }, function (err, updatedCategory) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(updatedCategory);
                    }
                });
            }
        });
    }
});
router.get('/:id', function (req, res) {
    stadium_1.default.findById(req.params['id']).then(function (stadium) {
        res.json(comments);
    });
});
exports.default = router;
