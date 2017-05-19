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
        newComment.save(function (err, result) {
            if (err) {
                console.log(err);
                res.end();
            }
            else {
                console.log(result);
                res.end();
            }
        });
        stadium_1.default.findByIdAndUpdate(stadium._id, { $push: { comments: newComment._id } }, { "new": true, "upsert": true }, function (err, comment) {
            if (err) {
                console.log(err);
                res.end();
            }
            else {
                console.log(comment);
                res.end();
            }
        });
    }
});
exports.default = router;
