"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var StadiumSchema = new mongoose.Schema({
    name: String,
    sport: String,
    url: String,
    owner_id: String
});
exports.default = mongoose.model('Stadium', StadiumSchema);
