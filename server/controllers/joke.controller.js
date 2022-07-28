/* 
    Joke Controller
*/

// import joke model
const Joke = require('../models/joke.model');

// function to get all jokes
exports.getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.find().populate('jokedBy', 'name email');
        const count = jokes.length;
        res.status(200).json({ jokes, count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// function to get a random joke
exports.getRandomJoke = async (req, res) => {
    try {
        const joke = await Joke.aggregate([{
            $sample: { size: 1 }
        }, {
            $lookup: { from: 'users', localField: 'jokedBy', foreignField: '_id', as: 'jokedBy' }
        },
        {
            $unwind: "$jokedBy"
        },
        {
            $project: {
                _id: 1,
                joke: 1,
                jokedBy: {
                    name: "$jokedBy.name",
                    email: "$jokedBy.email"
                },
                jokedAt: 1
            }
        }
        ]);
        res.status(200).json(joke[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// function to post a joke
exports.postJoke = async (req, res) => {
    const user = req.user;
    const body = req.body;
    try {
        const joke = await Joke.create({
            joke: body.joke,
            jokedBy: user._id,
        });
        res.status(201).json({ message: 'Joke created successfully', joke });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// export joke controller
module.exports = exports;