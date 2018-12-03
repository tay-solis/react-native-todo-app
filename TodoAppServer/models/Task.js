const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    soFar: Number, 
    completed: Number,
    dateSubmitted: {
      type: Date,
      required: true,
    },
    updates: [{
      dateUpdated: Date,
      soFar: Number
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

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;