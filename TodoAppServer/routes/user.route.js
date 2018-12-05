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
               
               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    const user = new User({
                     _id: new  mongoose.Types.ObjectId(),
                     firstName: req.body.firstName,
                     lastName: req.body.lastName,
                     username: req.body.username,
                     email: req.body.email,
                     password: hash 
                  });
                    user.save().then(()=> {
                     db.Profile.create({
                        _id: new  mongoose.Types.ObjectId(),
                        user: user
                     }, (err, profile) =>{
                        if(err) throw err;
                        console.log('created' + JSON.stringify(profile))
                        user.profile = profile;
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
                            success: 'Welcome!',
                            jwt: JWTToken,
                            user: {
                               username: user.username,
                               firstName: user.firstName,
                               lastName: user.lastName,
                               _id: user._id
                            }
                          });
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

/////// RETRIVE PROFILE INFO ///////
router.get('/profile/:username', (req,res)=>{
   User.findOne({username: req.params.username}, (err, user)=>{
      if (err) throw err;
      console.log(req.params.username)
      if(user === null) return res.status(404).json({error: "User not found"});
      
      db.Profile.findOne({user: user})
   .exec((err, profile)=>{
      if(err) throw err;
      res.json(profile)
  })
   });
});


/////// RETRIEVE USER INFO, INCLUDING TASKS ///////
router.get('/:username', (req,res)=>{
   db.User.find({username: req.params.username})
   .populate({path: 'tasks', model: db.Task})
   .exec((err, users)=>{
      if(err) throw err;
      console.log(`retrieved ${users[0]}`)
      res.json(users[0])
  })
});


module.exports = router;