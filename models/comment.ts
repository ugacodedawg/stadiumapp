import mongoose = require('mongoose');

/*----------DEFINE COMMENT SCHEMA----------*/
let CommentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

export default mongoose.model('Comment', CommentSchema);
