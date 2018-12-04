const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../models')

/////// CREATE A TASK ///////
router.post('/create', (req, res) => {
  let taskData = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.task.name,
    type: req.body.task.type,
    soFar: req.body.task.soFar,
    completed: req.body.task.completed,
    dateSubmitted: req.body.task.dateSubmitted,
    updates: req.body.task.updates,
    isCompleted: false,
  }

  db.Task.create(taskData, (err, savedTask) => {
    if (err) throw err;
      db.User.findOne({
          username: req.body.user
      }, (err, savedUser) => {
        if (err) throw err;
          savedUser.tasks.push(savedTask);
          savedUser.save((err)=>{
              if(err) throw err;
          });
          savedTask.user = savedUser;
          savedTask.save((err) => {
          if (err) throw err});
          res.json(savedTask);
      });   
  });
});


/////// ADD PROGRESS TO A TASK ///////
//Expects: Params - _id of task, Body - new value for "soFar," dateUpdated
router.put('/update/:id', (req, res) => {
  let taskId = req.params.id;
  let update = {
    soFar: req.body.soFar,
    dateUpdated: req.body.dateUpdated
  };
  db.Task.findOne({
    _id: taskId
  }, (err, updatedTask) => {
    if (err) return console.log(`Could not update ${taskId}: ${err}`);

    if (updatedTask === null) {
      console.log('Task not found.')
      res.status(404).json({
        error: 'Could not find task'
      })
    } else {
      if (updatedTask.isCompleted) {
        console.log('Task has already been completed')
        res.status(403).json({
          error: "Task has already been completed"
        });
      } else {
        console.log(`updating task`)
        console.log(updatedTask)
        updatedTask.updates.push(update);
        updatedTask.soFar = update.soFar;
        if (updatedTask.soFar === updatedTask.completed) {
          updatedTask.dateCompleted = update.dateUpdated;
          updatedTask.isCompleted = true;
        }
        updatedTask.save()
          .then(() => {
            res.json(updatedTask);
          });

      }
    }

  });
});

/////// DESTROY A TASK - RETURNS NEW ARRAY OF TODOS
router.delete('/delete/:username/:id', (req, res) => {
  db.Task.deleteOne({
    _id: req.params.id
  }, (err, deletedTask) => {
    if (err) throw err;
    db.User.findOne({username: req.params.username}, (err, user)=>{
      if(err) throw err
      db.Task.find({user: user}, (err, tasks)=>{
        if(err) return res.status(500);
        res.status(200).json(tasks)
      });
    })   
  })

})

/////// RETRIEVE ALL TASKS BY A USER ///////

router.get('/by/:username', (req, res)=>{
  console.log(`retrieving tasks by ${req.params.username}`)
  db.User.findOne({username: req.params.username}, (err, user)=>{
    if(err) return res.status(500).json({error: 'Internal server error'});
    if(user === null) {
      console.log('User not found')
      return res.status(404).json({error: 'User not found'})
    }
    db.Task.find({user: user}, (err, tasks)=>{
      if(err) return res.status(500).json({error: 'Internal server error'});
      if(tasks === null) {
        console.log('Tasks not found')
        return res.status(404).json({error: 'Tasks not found'})
      }
      res.status(200).json(tasks);
    })
  })
})

////// RETRIEVE INDIVIDUAL TASK INFO //////
router.get('/:id', (req, res) => {
  db.Task.findOne({
      _id: req.params.id
    })
    .exec((err, task) => {
      if (err) throw err;
      if (task === null) {
        res.status(404).json({
          error: 'task not found'
        })
      } else {
        res.json(task)
      }
    });
});


module.exports = router;