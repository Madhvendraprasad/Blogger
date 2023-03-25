const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  description:{
   type:String,
   required:true,
  }, 
  type: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
