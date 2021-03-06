'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);


// describe('Reality check', function () {

//   it('true should be true', function () {
//     expect(true).to.be.true;
//   });

//   it('2 + 2 should equal 4', function () {
//     expect(2 + 2).to.equal(4);
//   });

// });

//test the Static server
describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/bad/path')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

});

//test the GET endpoint api
describe('GET request to api/notes', function() {
  it('should get a full list of notes', function() {
    return chai
      .request(app)
      .get('/api/notes')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');

        const expectedKeys = ['id', 'title', 'content'];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        
        });
        console.log(res.body);
        console.log(res);
      });
  });
});

describe('GET request to api/notes/:id', function() {
  it('should return one note matching the id', function() {
    let note = {title: 'test title', content: 'test content'};
    return chai
      .request(app)
      .get('/api/notes/1000')
      .send(note)
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        //expect(res.body).to.be()

        // const expectedKeys = ['id', 'title', 'content'];
      });
    console.log(res);
  });
});

describe.only('POST request to api/notes', function() {
  it('it should  POST a new note to the list', function() {
    const newNote = {title: 'new Title', content: 'new Content'};
    console.log(newNote);
    return chai
      .request(app)
      .post('/api/notes')
      .send(newNote)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(newNote, {id: res.body.id}));
      });
    console.log(res.body);
  });
});
