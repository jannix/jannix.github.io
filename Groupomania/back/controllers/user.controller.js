const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Login = db.logins;
const constants = require('../constants/secret-constants');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const login = {
            email: req.body.email,
            password: hash
        };
        Login.create(login).then(data => {
            const user = {
                login: data.dataValues.id,
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };
            User.create(user).then((user) => res.status(201).json({
                message: 'Utilisateur créé !' ,
                userId: user.id,
                token: jwt.sign({ loginId: data.dataValues.id, },
                    constants.AUTH_TOKEN,
                    { expiresIn: '24h' })
            })).catch(error => res.status(400).json({ error }));
        }).catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while creating the Login."})});
    }).catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log('get to login');
    Login.findAll({ where: { email: req.body.email } }).then( login => {
        console.log('found the login');
            bcrypt.compare(req.body.password, login[0].dataValues.password).then(valid => {
                    console.log("bcrypted !!!");
                    if (!valid) {
                        console.log('not valid');
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    getUserByLoginId(login[0].dataValues.id)
                        .then((user) => {
                            console.log('logined : '+ user[0].dataValues.id);
                            res.status(200).json({
                                userId: user[0].dataValues.id,
                                token: jwt.sign(
                                    { loginId: login[0].dataValues.id },
                                    constants.AUTH_TOKEN,
                                    { expiresIn: '24h' })
                            });
                        });
            }).catch(error => res.status(500).json({ error }));
    }).catch(error => res.status(500).json({ error }));
};

exports.updateUserEmail = (req, res) => {
    User.findByPk(req.params.id, {raw: true}).then( user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inexistant !' });
        }
        if (isMySelf(req.headers.authorization.split(' ')[1], user.login)) {
            Login.findByPk(user.login, {raw: true}).then( login => {
                bcrypt.compare(req.body.password, login.password).then( valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const newLoginEmail = {
                        email: req.body.newEmail
                    };
                    Login.update(newLoginEmail, { where: { id: login.id } }).then(result => {
                        if (result[0] === 1) {
                            res.status(200).json({
                                message: 'Email update !' ,
                                result: result
                            })
                        } else {
                            res.status(404).json({ error: "Error, login probably was not found. User ID : " + req.params.id });
                        }
                    }).catch(err => {res.status(500).send({message: err})});
                });
            }).catch(error => res.status(500).json({ error }));
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have the right to update another user.' });
        }
    }).catch(error => res.status(500).json({ error }))
};


exports.updateUserPassword = (req, res) => {
    User.findByPk(req.params.id, {raw: true}).then( user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inexistant !' });
        }
        if (isMySelf(req.headers.authorization.split(' ')[1], user.login)) {
            Login.findByPk(user.login, {raw: true}).then( login => {
                bcrypt.compare(req.body.password, login.password).then( valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    bcrypt.hash(req.body.newPassword, 10).then(hash => {
                        const newLoginPassword = {
                            password: hash
                        };
                        Login.update(newLoginPassword, { where: { id: login.id } }).then(result => {
                            if (result[0] === 1) {
                                res.status(200).json({
                                    message: 'Password update !' ,
                                    result: result
                                })
                            } else {
                                res.status(404).json({ error: "Error, login probably was not found. User ID : " + req.params.id });
                            }
                        }).catch(err => {res.status(500).send({message: err})});
                    }).catch(error => res.status(500).json({ error }));
                });
            }).catch(error => res.status(500).json({ error }));
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have the right to update another user.' });
        }
    }).catch(error => res.status(500).json({ error }))
};

exports.updateUserInfo = (req, res) => {
    User.findByPk(req.params.id, {raw: true}).then( user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inexistant !' });
        }
        if (isMySelf(req.headers.authorization.split(' ')[1], user.login)) {
            User.update(req.body, { where: { id: req.params.id } }).then(result => {
                if (result[0] === 1) {
                    res.status(200).json({
                        message: 'Utilisateur update !',
                        result: result
                    })
                } else {
                    res.status(404).json({ error: "Error, user probably was not found. User ID : " + req.params.id });
                }
            }).catch(err => {res.status(500).send({message: err})});
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have the right to update another user.' });
        }
    }).catch(error => res.status(500).json({ error }))

};

//TODO: move in util functions
function isMySelf(authToken, loginId) {
    const decodedToken = jwt.verify(authToken, constants.AUTH_TOKEN);
    const tokenId = decodedToken.loginId;
    return tokenId === loginId;
}

exports.getUserById = (req, res, next) => {
    User.findByPk(req.params.id, {raw: true}).then( user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inexistant !' });
        }
        let dataToSend;
        if (isMySelf(req.headers.authorization.split(' ')[1], user.login)) {
            Login.findByPk(user.login, {raw: true}).then((login) => {
                dataToSend = {
                    email: login.email,
                    ...user
                };
                res.status(200).json({userFound: dataToSend});
            });
        } else {
            dataToSend = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                jobId: user.jobId,
                karma: user.karma,
                about: user.about,
            };
            res.status(200).json({userFound: dataToSend});
        }
    }).catch(error => res.status(500).json({ error }));
};

function getUserByLoginId(loginId) {
    return User.findAll({ where: { login: loginId } });
}
