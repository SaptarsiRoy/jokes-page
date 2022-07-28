/*
    jokes routes file
*/
// import express
const express = require('express');

// joke controller
const controller = require('../controllers/joke.controller');

// auth middleware
const auth = require('../middleware/auth.middleware');

// create a router
const router = express.Router();

// get request to get all jokes
router.get('/jokes/:id', auth, controller.getAllJokes);

// get request to get a random joke
router.get('/joke/random/:id', auth, controller.getRandomJoke);

// post request to add a new joke
router.post('/jokes', auth, controller.postJoke);

// export joke routes
module.exports = router;