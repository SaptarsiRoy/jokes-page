/*
    setup middleware for authentication
*/
// import User model
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    const id = req.params.id || req.body.id;
    try {
        const user = await User.findById(id);
        if (user) {
            req.user = user;
            next();
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = auth;