const jwt = require('jsonwebtoken');
const constants = require('../constants/secret-constants');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, constants.AUTH_TOKEN);
        const loginId = decodedToken.loginId;
        if (req.body.loginId && req.body.loginId !== loginId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(403).json({
            error: new Error('Authentication failed.')
        });
    }
};
