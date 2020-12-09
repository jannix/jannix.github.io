const Sequelize = require("sequelize");
const db = require('../models');
const Sub = db.subs;

exports.create = (req, res, next) => {
    console.log(req.body);
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
