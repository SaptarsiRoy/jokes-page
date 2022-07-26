/*
    setup middleware for authentication
*/

const auth = (req, res, next) => {
    const user = req.body.user;
    if (user) {
        req.user = user;
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = auth;