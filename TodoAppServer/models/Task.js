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
    isCompleted: {
      type: Boolean,
      required: true,
    },
    dateSubmitted: Date,
    updates: [{
      dateUpdated: Date,
      soFar: Number
    }],
    dateCompleted:  Date,
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;