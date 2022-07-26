// import mongoose
const mongoose = require('mongoose');

// joke schema
const jokeSchema = new mongoose.Schema({
    joke: {
        type: String,
        required: true,
    },
    jokedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jokedAt: {
        type: Date,
        default: Date.now,
    },
});

// export joke model
module.exports = mongoose.model('Joke', jokeSchema);