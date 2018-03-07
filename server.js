'use strict';

// TEMP: Simple In-Memory Database

//const logger = require('./middleware/logger');
const {PORT} = require('./config');

console.log('hello world!');

const express = require('express');
const morgan = require('morgan');
const notesRouter = require('./router/notes.router');

const app = express();
//log requests
app.use(morgan('dev'));

app.use(notesRouter);
app.use(express.static('public'));
app.use(express.json());




app.get('/boom', (req, res, next) => {
  throw new Error('Boom!');
});

//Express Error-Handling Middleware
//404 handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404; 
  res.status(404).json({ message: 'Not Found'});
});

//custom error handler middleware
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
