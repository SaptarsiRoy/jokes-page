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

// post request to send an email to me with the user's message
router.post('/sendEmail' ,controller.sendEmail);

// export user routes
module.exports = router;
