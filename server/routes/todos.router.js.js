const router = require('express').Router();
const pool = require('../modules/pool');


// GET all Tasks

router.get(()=>{
    let queryText; // = SELECT FROM TABLE
    pool.query(queryText)
    .then(result =>{
        res.send(); //<--- inside should be result.rows, should return results in an object
    })
    .catch(error =>{
        console.log("error getting ToDoList", error);
        res.sendStatus(500);
    })
    
});

// // gives ability to create a new todo item
// router.post()


// // for updating table: example updating isCompleted status
// router.put()

// // for deleting task from task list and from database 
// router.delete()





module.exports = router;
