'use strict';

// TEMP: Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const {PORT} = require('./config');

console.log('hello world!');

const express = require('express');

const app = express();
app.use(express.static('public'));

const logger = function(req, res, next) {
  const now = new Date();
  console.log(
    `${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`
  );
  next();
};

app.use(logger);

app.get('/api/notes', (req, res) => {
  
  const {searchTerm} = req.query;
  let searchData = searchTerm ? data.filter(notes => notes.title.includes(searchTerm)) : data;
  res.json(searchData);
});

app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = data.find(note => note.id === id);
  res.json(note);
});

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
