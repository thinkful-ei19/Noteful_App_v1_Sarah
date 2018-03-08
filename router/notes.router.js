'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/api/notes', (req, res, next) => {
  const {searchTerm} = req.query;

  notes.filter(searchTerm) 
    .then(list => {
      res.json(list); 
    })
    .catch(err => {
      next(err);
    });
});
  
//   (err, list) => {
//     if (err) {
//       return next(err); //will go to error handler
//     }
//     //else if code to throw error if not found 
//     // else if (list.length <= 0) {
//     //   next('Not found');
//     // }
//     res.json(list);
//   });
// });

router.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  notes.find(id)
    .then(item=> {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
  
//   (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
// });

// Post (insert) an item
router.post('/api/notes', (req, res, next) => {
  const { title, content } = req.body;
  console.log(title, content);
  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if(item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => next(err));
  // (err, item) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (item) {
  //     res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
  //   } else {
  //     next();
  //   }
  // });
});

router.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  //validate input!!
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => next(err));
  
  // (err, item) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (item) {
  //     res.json(item);
  //   } else {
  //     next();
  //   }
});


//delete an item
router.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  notes.delete(id)
    .then(item => {
      if(item) {
        res.sendStatus(204);
      } else {
        next();
      }
    })
    .catch(err => next(err));
  
  // (err, item) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (item) {
  //     console.log(`Deleteing item ${req.params.id}`);
  //     res.sendStatus(204);
  //   }
  //   else {
  //     next();
  //   }
  // });
});

module.exports = router;
