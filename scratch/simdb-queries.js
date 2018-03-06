'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('10', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'I am titular',
  content: 'All the things'
};

notes.update(1008, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});
