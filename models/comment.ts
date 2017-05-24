import mongoose = require('mongoose');

/*----------DEFINE COMMENT SCHEMA----------*/
let CommentSchema = new mongoose.Schema({
    text: String,
    author: String
});

export default mongoose.model('Comment', CommentSchema);
