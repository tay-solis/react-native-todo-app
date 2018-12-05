const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
      type: String,
      default: 'Just a Human Bean'
    },
    location: {
      type: String,
      default: 'Citizen of the World'
    },
    websiteUrl: {
      type: String
    },
    bio: {
      type: String,
      default: 'Tell us about yourself!'
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;