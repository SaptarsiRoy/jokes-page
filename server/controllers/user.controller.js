/* 
    User Controller
*/
// import user model
const User = require('../models/user.model');

// function to register a user
exports.registerUser = async (req, res) => {
    const body = req.body;
    try {
        // find if user already exists
        const user = await User.findOne({ email: body.email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        } else {
            const newUser = await User.create(body);
            res.status(201).json({ message: 'User created successfully', newUser });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// function to login a user
exports.loginUser = async (req, res) => {
    const body = req.body;
    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(body.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// export user controller
module.exports = exports;