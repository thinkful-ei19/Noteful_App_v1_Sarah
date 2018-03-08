'use strict';
/* global api $*/

// Simple In-Memory Database (async-callback version)

// test get all
api.search({})
  .then(response => {
    console.log(response);
  });

// test get all with search term
api.search({searchTerm: 'ways'})
  .then(response => {
    console.log(response);
  });

// test get by id
api.details(1005)
  .then(response => {
    console.log(response);
  });

//api test POST
api.create({title: 'stuff', content: 'things'})
  .then(response => {
    console.log(response);
  });

//api test PUT
api.update(1005, {title: 'new title', content: 'new content'})
  .then(response => {
    console.log(response);
  });


//api test DELETE
api.remove(1005)
  .then(response => {
    console.log(response);
  });

