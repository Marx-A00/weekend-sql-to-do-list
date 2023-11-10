const router = require('express').Router();
const pool = require('../modules/pool');


// GET all Tasks

router.get('/',(req,res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";'
    pool.query(queryText)
    .then((dbResult) =>{
        console.log('dbResult.rows:', dbResult.rows);
        res.send(dbResult.rows); //<--- inside should be result.rows, should return results in an object
    })
    .catch(dbError =>{
        console.log("error getting ToDoList", dbError);
        res.sendStatus(500);
    })

});


// // gives ability to create a new todo item
router.post('/',(req,res) => {
    let queryText = 
    `
    INSERT INTO "todos"
    ("text")
    VALUES
    ($1);
    `



    const sqlValues = [
        req.body.taskName
    ]

    pool.query(queryText,sqlValues)
    .then((dbResult) => {
        res.sendStatus(201)
    })
    .catch((dbError)=>{
        console.log('POST / todos query failed', dbError)
    })
});


// // for updating table: example updating isCompleted status
// router.put()
router.put('/:id',(req,res) => {

let idOfTask = req.params.id;

const sqlText = 
`
UPDATE "todos"
SET "isComplete" = NOT "isComplete"
WHERE "id" = ($1)
`

const sqlValues = [idOfTask];

pool.query(sqlText,sqlValues)
.then((dbResult) => {
    res.sendStatus(200);
    })
.catch((dbError) =>{
    console.log('PUT /koalas:id failed',dbError)
    res.sendStatus(500);
    })
});




// // for deleting task from task list and from database 
// router.delete()
router.delete('/:id',(req,res)=>{

    let idOfTaskToDelete = req.params.id;
    const sqlText = 
    `
    DELETE FROM "todos"
        WHERE "id" = ($1)
    `
    const sqlValues = [idOfTaskToDelete];

    pool.query(sqlText,sqlValues)
    .then((dbResult) => {
        res.sendStatus(200);
    })
    .catch((dbError) => {
        console.log("DELETE /todos/:id failed", dbError);
        res.sendStatus(500);
    })
});





module.exports = router;
