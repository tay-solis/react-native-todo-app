const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks:[{
      type: Schema.Types.ObjectId,
      ref: 'Posts'
    }],
    profile:{
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;