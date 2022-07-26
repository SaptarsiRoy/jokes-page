/*
    user routes file
*/
// import express
const express = require('express');

// user controller
const controller = require('../controllers/user.controller');

// create a router
const router = express.Router();

// post request to register a new user
router.post('/register', controller.registerUser);

// post request to login a user
router.post('/login', controller.loginUser);

// export user routes
module.exports = router;
