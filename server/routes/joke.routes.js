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
router.get('/jokes', auth, controller.getAllJokes);

// post request to add a new joke
router.post('/jokes', auth, controller.postJoke);

// export joke routes
module.exports = router;