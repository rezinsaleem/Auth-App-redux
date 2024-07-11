const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    console.log('Received token:', token);

    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return next(errorHandler(403, 'Token is not valid!'));
        }

        req.user = user;
        next();
    });
};

module.exports = {
    verifyToken,
};
