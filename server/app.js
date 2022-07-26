// import express, body-parser, and cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db.config');

// connect to mongodb using connection
connection.once('open', () => {
    console.info('MongoDB connected successfully')
});

connection.on('error', (err) => {
    console.error('error', 'MongoDB connection error: ' + err);
});

// create an express application
const app = express();

// use body parser with our application
app.use(bodyParser.json());

// use cors to allow cross origin resource sharing
app.use(cors());

// register routes
app.use('/api', require('./routes/joke.routes'));
app.use('/api', require('./routes/user.routes'));

// set our port
const port = process.env.PORT || 5000;

// listen on port
app.listen(port, () => console.log(`Listening on port ${port}`));