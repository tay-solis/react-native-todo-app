const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    type: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    tasks:[{
      type: Schema.Types.ObjectId,
      ref: 'Tasks'
    }],
    profile:{
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;