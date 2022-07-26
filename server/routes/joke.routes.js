/*
    jokes routes file
*/
// import express
const express = require('express');

// user controller
const controller = require('../controllers/joke.controller');

// create a router
const router = express.Router();

// get request to get all jokes
router.get('/jokes', controller.getAllJokes);

// post request to add a new joke
router.post('/jokes', controller.postJoke);

// export joke routes
module.exports = router;