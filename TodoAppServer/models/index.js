const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo-app", {useNewUrlParser: true});

module.exports.Task = require('./Task')
module.exports.Profile = require('./Profile')
module.exports.User = require('./User')