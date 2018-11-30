const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;