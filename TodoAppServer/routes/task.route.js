const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../models')

/////// CREATE A TASK ///////
router.post('/create', (req, res) => {
  console.log(`Creating task:`);
  console.log(req.body)
  let taskData = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    soFar: req.body.soFar,
    completed: req.body.completed,
    dateSubmitted: req.body.dateSubmitted,
    updates: req.body.updates,
    isCompleted: false,
  }

  db.Task.create(taskData, (err, savedTask) => {
    if (err) throw err;
    db.User.findOne({
      username: req.body.user
    }, (err, savedUser) => {
      if (err) throw err;
      savedUser.tasks.push(savedTask);
      savedUser.save((err, savedUser) => {
        if (err) throw err;
        console.log(savedUser)
      });
      savedTask.user = savedUser;
      savedTask.save((err, savedTask) => {
        if (err) throw err;
        console.log(`Saved ${savedTask}`)
      });
      res.json(savedTask)
    })
  })
});


/////// ADD PROGRESS TO A TASK ///////
//Expects: Params - _id of task, Body - new value for "soFar," dateUpdated
router.put('/update/:id', (req, res) => {
  let taskId = req.params.id;
  let update ={
    soFar: req.body.soFar,
    dateUpdated: req.body.dateUpdated
  };


  db.Task.findOne({_id: taskId}, (err, updatedTask) => {
    if (err) return console.log(`Could not update ${taskId}: ${err}`);
    console.log(`updating task`)
    console.log(updatedTask)
    if(updatedTask.isCompleted){
      res.status(403).json({
        error: "Task has already been completed"
      });
    } else{
      console.log(update) 
      console.log(`to`)
      console.log(updatedTask.updates);
      updatedTask.updates.push(update);
      updatedTask.soFar = update.soFar;
      if(updatedTask.soFar === updatedTask.completed) {
        updatedTask.dateCompleted = update.dateUpdated;
      }
      updatedTask.save()
      .then(()=>{
        res.json(updatedTask);
      });
      
    }   
  });
});

/////// RETRIEVE TASKS BY A USER ///////
router.get('/:username', (req, res) => {
  db.User.findOne({
    username: req.params.username
  }, (err, user) => {
    if (err) throw err;
    if (user === null) {
      res.status(404).json({
        error: 'user not found'
      })
    } else {
      db.Task.find({
          user: user
        })
        .exec((err, tasks) => {
          if (err) throw err;
          res.json(tasks)
        })
    }
  })
});


module.exports = router;