const express = require('express');
const router = express.Router();



router.post('/signup',function(req, res) {
   
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
                  city: req.body.city,
                  joinDate: req.body.joinDate,
                  email: req.body.email  
               });

               
               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save().then(function(result) {
                      console.log(result);
                      res.status(200).json({
                         success: 'New user has been created'
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

   User.findOne({username: req.body.username}, (err, user)=>{
      if(err) throw err;
      if (user !== null){
         bcrypt.compare(req.body.password, user.password, (err, result)=>{
            if (err) throw err;
            if(result) {
               
              }
            return res.status(401).json({
               failed: 'Credentials not valid'
            });
         });
      } else {
         return res.status(403).json({
            error: 'Username not found.'
         });
      }
   });
});


/////// RETRIEVE USER INFO ///////
router.get('/:username', (req,res)=>{
   db.User.findOne({username: req.params.username}, (err, user)=>{
      if (err) throw err;
      res.json(user)  
   })
});


module.exports = router;