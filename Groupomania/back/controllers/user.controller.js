const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Login = db.logins;
const constants = require('../constants/secret-constants');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const login = {
                email: req.body.email,
                password: hash
            };
            Login.create(login)
                .then(data => {
                    const user = {
                        login: data.dataValues.id,
                        username: req.body.username,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    };
                    User.create(user).then((data) => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Login."
                    });
                });
            /*user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));*/
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log("!!! LOG IN !!!");
    console.log(req.body.email);
    Login.findAll({ where: { email: req.body.email } }).then( login => {
        bcrypt.compare(req.body.password, login[0].dataValues.password)
            .then(valid => {
                console.log("bcrypted !!!");
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    loginId: login[0].dataValues._id,
                    token: jwt.sign(
                        { loginId: login[0].dataValues._id },
                        constants.AUTH_TOKEN,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    }).catch(error => res.status(500).json({ error }));
    /*User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            constants.AUTH_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));*/
};
