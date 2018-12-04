const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../models')

router.post('/signup',  function(req, res) {
   //Check if user exists with that username
   User.findOne({username: req.body.username}, (err, existingUser)=>{
      if (err) throw err;
      if(existingUser === null){
         User.findOne({email: req.body.email}, (err, existingEmail)=>{
            if(err) throw err;
            if(existingEmail === null){
               const user = new User({
                  _id: new  mongoose.Types.ObjectId(),
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  username: req.body.username,
                  email: req.body.email 
               });
               
               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save().then(function(result) {
                     const JWTToken = jwt.sign({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        tasks: [],
                        profile: {},
                        _id: user._id
                      },
                      'secret',
                       {
                         expiresIn: '2h'
                       });
                       return res.status(200).json({
                         success: 'Welcome back!',
                         jwt: JWTToken,
                         user: {
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            _id: user._id
                         }
                       });
                   }).catch(err=> {
                      res.status(500).json({
                         error: err
                      });
                     })
                  })
               
               });
               // 

               
            } else{
               console.log('Bad signup: Email already exists')
               res.status(403).json({
                  error: 'Email already exists'
               });
            }
         })
      } else{
         console.log('Bad signup: Username already exists')
               res.status(403).json({
                  error: 'Username already exists'
               });
      }
   })        
});


/////// LOG IN ///////
router.post('/login', function(req, res){
   console.log(`logging in`)
   console.log(req.body.username)

   User.findOne({username: req.body.username}, (err, user)=>{
      if(err) throw err;
      if (user !== null){
         bcrypt.compare(req.body.password, user.password, (err, result)=>{
            if (err) throw err;
            if(result) {
               const JWTToken = jwt.sign({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id
                  },
                  'secret',
                   {
                     expiresIn: '2h'
                   });
                   return res.status(200).json({
                     success: `Welcome back, ${user.firstName}!`,
                     jwt: JWTToken,
                     user: {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        _id: user._id
                     }
                   });
              }
            return res.status(401).json({
               failed: 'Credentials not valid'
            });
         });
      } else {
         return res.status(404).json({
            error: 'Username not found.'
         });
      }
   });
});

/////// RETRIEVE USER INFO, INCLUDING TASKS ///////
router.get('/:username', (req,res)=>{
   db.User.find({username: req.params.username})
   .populate({path: 'tasks', model: db.Task})
   .exec((err, users)=>{
      if(err) throw err;
      res.json(users[0])
  })
});


module.exports = router;