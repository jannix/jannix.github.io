const db = require('../models');
const Sub = db.subs;

exports.create = (req, res, next) => {
    console.log(req.body.subjectIds);
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
