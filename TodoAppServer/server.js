const express = require('express');
const app = express();
const port = process.env.PORT || 4000;


//Parses json to url
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());


//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jwtauth', { useNewUrlParser: true });

//CORS
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

// Task Routes
const task = require('./routes/task.route');
app.use('/task', task);

app.get('/', (req, res) => {
    res.send('hey')
});

app.listen(port, () => {
    console.log(`artWORK server is listening on port:${port}`);
})