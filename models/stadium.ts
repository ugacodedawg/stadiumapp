import mongoose = require('mongoose');

let StadiumSchema = new mongoose.Schema ({
  name:String,
  sport:String,
  url:String,
  owner_id:String
});

export default mongoose.model('Stadium', StadiumSchema);
