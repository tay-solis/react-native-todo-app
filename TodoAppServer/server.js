const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Parses json to url
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//Auth w/ Passport
const passport = require('passport')

// passport registration
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findOne({where: {user_id: id}})
    done(null, user)
  } catch (err) {
    done(err)
  }
})


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.static('public'));

// Auth Routes
const user = require('./routes/user.route');
app.use('/user', user);

// Post Routes
const tasks = require('./routes/tasks.route');
app.use('/tasks', tasks);

app.get('/', (req, res) => {
    res.send('hey')
});

app.listen(port, () => {
    console.log(`To-Do App Server is listening on port:${port}`);
})