import mongoose = require('mongoose');

/*----------DEFINE STADIUM SCHEMA----------*/
let StadiumSchema = new mongoose.Schema ({
  name:String,
  city:String,
  sport:String,
  url:String,
  username:String,
  comments:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
      }
  ]
});

export default mongoose.model('Stadium', StadiumSchema);
