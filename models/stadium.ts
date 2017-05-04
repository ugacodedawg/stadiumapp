import mongoose = require('mongoose');

let StadiumSchema = new mongoose.Schema ({
  name:String,
  city:String,
  sport:String,
  url:String,
  owner_id:String,
  comments:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
      }
  ]
});

export default mongoose.model('Stadium', StadiumSchema);
