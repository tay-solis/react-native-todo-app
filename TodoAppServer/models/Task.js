const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    dateSubmitted: {
      type: Date,
      required: true,
    },
    datesContributed: [{
      type: String,
      required: true,
    }],
    dateCompleted: {
        type: Date,
        required: true,
      },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;