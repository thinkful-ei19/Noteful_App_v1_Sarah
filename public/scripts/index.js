/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  api.search({}, response => {
   
    const newNote = {
      title: 'new note',
      content: 'the body'
    };
    console.log(newNote);
    api.create(newNote, response => {
      console.log('new note', response);
    });
    store.notes = response;
    noteful.render();
  });

});
