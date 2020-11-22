const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all books
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "tasks" ORDER BY "date";`;
  pool.query(queryText).then(result => {
    //console log our table object
    console.log(result.rows);
    // Sends our table object to client
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
  });
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.

router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log('adding task', newTask)

  let queryText = `INSERT INTO tasks (task, date, duration)
VALUES ($1, $2, $3);`;
  pool.query(queryText, [newTask.keyOne, newTask.keyTwo, newTask.keyThree])
     .then(result => {
       console.log('New task added to DB');
    res.sendStatus(200);
     })
    .catch(error => {
      console.log(`Error adding new book`, error);
     res.sendStatus(500);
     });
});


// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status
router.put('/:id',  (req, res) => {
  console.log('in PUT');
  let task = req.body.complete; // Book with updated content
  let id = req.params.id; // id of the book to update
console.log(task, id);
  //console.log(`Updating book ${id} with `, book);
let queryText = '';
if (task === 'true') {
  queryText = `UPDATE "tasks" 
              SET "complete" = 'true' 
              WHERE "id" = $1;`;
}
  // TODO - REPLACE BELOW WITH YOUR CODE
  pool.query(queryText, [id]).then( (result) => {
            // Delete sends back an OK status, 
            // client will then ask for all the data with a GET
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        })

});

// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
router.delete('/:id',  (req, res) => {
  let id = req.params.id; // id of the thing to delete
console.log('id to delete', id);
res.send('ok');
//  console.log('in delete');
let queryText = `DELETE FROM tasks WHERE id=$1;`//what is the 1 here
  //console.log('Delete route called with id of', id);
  // TODO - REPLACE BELOW WITH YOUR CODE
  //res.sendStatus(500);
  pool.query(queryText, [id])
    //.then(result => {
      //res.sendStatus(200);
    //})
    .catch(error => {
      console.log(`Error deleting new task`, error);
      res.sendStatus(500);
    });





});

module.exports = router;
