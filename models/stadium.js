"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var StadiumSchema = new mongoose.Schema({
    name: String,
    city: String,
    sport: String,
    url: String,
    username: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});
exports.default = mongoose.model('Stadium', StadiumSchema);
