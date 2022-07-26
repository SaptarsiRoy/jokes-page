// configure databse connection to mongodb
// use dotenv
require('dotenv').config({ path: '.env.local' });
// import mongoose
const mongoose = require('mongoose');

try {
    // connect to database
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.error(error.message);
}

// export connection
module.exports = mongoose.connection;