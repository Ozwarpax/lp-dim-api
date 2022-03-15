var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var studentRouter = require("./routes/student");


var app = express();
var mongoose = require("mongoose");
var connexionStringLocal = "mongodb+srv://jeremy:Pq0t6sUSYYbt0DMY@iut.kug8z.mongodb.net/School?retryWrites=true&w=majority";

var mongodb = process.env.MONGO_URI || connexionStringLocal;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use("/student", studentRouter);



module.exports = app;
