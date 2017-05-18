"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var comment_1 = require("../models/comment");
var router = express.Router();
router.post('/', function (req, res, next) {
    console.log(req.body);
    if (req.body.id === undefined) {
        var newComment = new comment_1.default({
            text: req.body.text,
            author: req.body.username
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
    }
});
exports.default = router;
