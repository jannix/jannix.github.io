const Sequelize = require("sequelize");
const db = require('../models');
const Sub = db.subs;

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
                    res.status(404).json({ error: "Error, post probably was not found. sub ID : " + req.params.id });
                }
            }).catch(err => {res.status(500).send({message: err})});
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have the right to update this sub.' });
        }
    }).catch(error => res.status(500).json({ error }))

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
