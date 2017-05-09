"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
    text: String,
    author: String,
    author_id: String
});
exports.default = mongoose.model('Comment', CommentSchema);
