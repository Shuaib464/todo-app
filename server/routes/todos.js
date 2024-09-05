const express = require('express')

// make a router instance
const router = express.Router();

// import controller
const {createTodo} = require('../controllers/createTodo');

// map the route with the controller
router.post('/createTodo', createTodo)


// export the router 
module.exports = router;