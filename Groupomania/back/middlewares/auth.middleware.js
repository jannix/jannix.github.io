const jwt = require('jsonwebtoken');
const constants = require('../constants/secret-constants');
const db = require('../models');
const User = db.users;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, constants.AUTH_TOKEN);
        const loginId = decodedToken.loginId;
        if (!req.headers.userid) {
            throw 'Does not have userId';
        } else {
            User.findByPk(req.headers.userid, {raw: true}).then((user) => {
                try {
                    if (!user || (user.login !== loginId)) {
                        throw 'Invalid login ID';
                    } else {
                        next();
                    }
                } catch {
                    res.status(403).json({
                        error: new Error('Authentication failed.')
                    });
                }
            }).catch((error) => {
                throw 'Cannot find user ID : ' + req.headers.userid;
            });
        }
    } catch {
        res.status(403).json({
            error: new Error('Authentication failed.')
        });
    }
};
