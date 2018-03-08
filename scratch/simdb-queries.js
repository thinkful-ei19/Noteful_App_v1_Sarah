'use strict';
//playing with promises
function coinFlip(delay) {
  return new Promise((resolve, reject) => {
    const rand = Boolean(Math.round(Math.random()));
    setTimeout(function () {
      if (rand) {
        resolve('Heads!');
      } else {
        reject('Tails!');
      }
    }, delay);
  });
}

coinFlip(500)
  .then(res => {
    console.log(1, res);
    return coinFlip(500);
  })
  .then(res => {
    console.log(2, res);
    return coinFlip(500);
  })
  .then(res => {
    console.log(3, res);
    return 'You Win!';
  })
  .then(res => {
    console.log(4, res);
  })
  .catch(err => {
    console.error(err);
  });


// const timeoutPromise = new Promise((resolve, reject) => {
//   const rand = Boolean(Math.round(Math.random()));
//   setTimeout(function () {
//     if (rand) {
//       resolve('Heads!');
//     } else {
//       reject('Tails!');
//     }
//   }, 1000);
// });

// timeoutPromise
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);



// // GET Notes with search
// notes.filter('10', (err, list) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log(list);
// });

// // GET Notes by ID
// notes.find(1005, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('not found');
//   }
// });

// // PUT (Update) Notes by ID
// const updateObj = {
//   title: 'I am titular',
//   content: 'All the things'
// };

// notes.update(1008, updateObj, (err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('not found');
//   }
// });
