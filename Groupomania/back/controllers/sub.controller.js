const Sequelize = require("sequelize");
const db = require('../models');
const Sub = db.subs;
const Post = db.posts;
const User = db.users;

exports.create = (req, res, next) => {
    const sub = {
        title: req.body.title,
        description: req.body.description,
        ownerId: req.body.ownerId,
        subjectIds: req.body.subjectIds
    };
    Sub.create(sub).then((sub) => res.status(201).json({
        message: 'Sub créé !',
        subId: sub.id,
    })).catch(error => res.status(400).json({ error }));
};

exports.updateSub = (req, res) => {
    Sub.findByPk(req.params.id, {raw: true}).then( sub => {
        if (!sub) {
            return res.status(401).json({ error: 'Post inexistant !' });
        }
        if (req.body.editerid === sub.ownerid/*TODO: check if admin*/) {
            const updatedSub = {
                title: req.body.title,
                description: req.body.description,
                subjectIds: req.body.subjectIds,
            };
            Sub.update(updatedSub, { where: { id: req.params.id } }).then(result => {
                if (result[0] === 1) {
                    res.status(200).json({
                        message: 'Sub update !',
                        result: result
                    })
                } else {
                    res.status(404).json({ error: "Error, sub probably was not found. sub ID : " + req.params.id });
                }
            }).catch(err => {res.status(500).send({message: err})});
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have the right to update this sub.' });
        }
    }).catch(error => res.status(500).json({ error }))
};

exports.deleteSub = (req, res) => {
    //TODO: check if able to destroy
    Sub.destroy({where: {id: req.params.id}}).then(count => {
        if (!count) {
            return res.status(404).send({error: "Error, sub probably was not found. sub ID : " + req.params.id});
        }
        User.findAll({where: {subscriptionIds: { [Sequelize.Op.contains]: [req.params.id] }}, raw: true}).then( users => {
            if (users && users.length > 0) {
                users.forEach(user => {
                    const index = user.subscriptionIds.indexOf(parseInt(req.params.id));
                    if (index !== -1) {
                        user.subscriptionIds.splice(index, 1);
                        User.update(user, { where: { id: user.id } }).then();
                    }
                });
            }
        });
        Post.findAll({where: {parentId: req.params.id, isOC: true}, raw: true}).then( posts => {
            if (posts && posts.length > 0) {
                posts.forEach(post => {
                    console.log(post.id);
                    Post.destroy({where: {parentId: post.id, isOC: false}}).then();
                });
                Post.destroy({where: {parentId: req.params.id, isOC: true}}).then();
            }
        });
        res.status(200).json({
            message: 'Sub deleted !',
            result: count
        })
    });
};

exports.getByTitle = (req, res, next) => {
    Sub.findAll({
        where: {title: {[Sequelize.Op.iLike]: req.params.title+'%'}},
        raw: true
    }).then( subs => {
        if (!subs || subs.length === 0) {
            return res.status(404).json({ error: 'Fil inexistant !' });
        }
        res.status(200).json({subsFound: subs});
    }).catch(error => res.status(500).json({ error }));
};

exports.getByExactTitle = (req, res, next) => {
    Sub.findAll({
        where: {title: req.params.title},
        raw: true
    }).then( subs => {
        if (!subs || subs.length === 0) {
            return res.status(404).json({ error: 'Fil inexistant !' });
        }
        res.status(200).json({subsFound: subs});
    }).catch(error => res.status(500).json({ error }));
};

exports.getById = (req, res, next) => {
    Sub.findByPk(req.params.id, {raw: true}).then( sub => {
        if (!sub) {
            return res.status(404).json({ error: 'Fil inexistant !' });
        }
        res.status(200).json({subFound: sub});
    }).catch(error => res.status(500).json({ error }));
};
